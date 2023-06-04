const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAdmin = require('../model/admin/AdminUser.schema');
const companySchema = require('../model/admin/company.schema');
const { v4: uuidv4 } = require('uuid');
const { generateCompanyId,
    validateBankAccount,
    initiateBankPayment,
    validateJazzCashNumber,
    initiateJazzCashPayment } = require('../model/admin/Admin.model');

router.post('/signup', async (req, res) => {
    try {
      const { username, email, password, role, secretKey } = req.body;
  
      // Check if user already exists
      const existingUser = await UserAdmin.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
      }
  
      // Check if the secret key or criteria for admin signup is met
      const isAdmin = secretKey === 'gabisbag'; // Replace 'your-secret-key' with your own secret key or custom criteria
      if (role === 'admin' && !isAdmin) {
        return res.status(403).json({ error: 'Access denied for admin role' });
      }
  
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new UserAdmin({
        username,
        email,
        password: hashedPassword,
        role,
        
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error occurred during user signup:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.post('/signIn', async (req, res) => {
    try {
      const { username, password, role } = req.body;
  
      // Check if the user exists
      const user = await UserAdmin.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Check if the user has the required role
      if (!['Admin', 'Manager', 'leadManager'].includes(role)) {
        return res.status(403).json({ error: 'Access denied' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error occurred during user login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

//company profile
router.post('/companies', async (req, res) => {
    try {
      // Get the company details from the request body
      const { name, numberOfUsers, maxAllowedUsers,companyId } = req.body;
      const companyid = generateCompanyId();
  
      // Find the company by name to check if it already exists
      const existingCompany = await companySchema.findOne({ name });
      if (existingCompany) {
        return res.status(409).json({ error: 'Company already exists' });
      }
  
      // Check if the number of users exceeds the limit
      if (numberOfUsers > maxAllowedUsers) {
        return res.status(400).json({ error: `Number of users exceeds the limit of ${maxAllowedUsers}` });
      }
  
      // Create a new company profile
      const company = new companySchema({
        name,
        numberOfUsers,
        maxAllowedUsers,
        companyId:companyid
      });
  
      // Save the company profile to the database
      await company.save();
  
      res.status(201).json({ message: 'Company profile created successfully'});
      
      
    } catch (error) {
      console.error('Error occurred while setting up company profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
 
//registering user 
router.post('/registration', async (req, res) => {
    try {
      const { fullName, email,password, contactNumber, userLevel,companyId } = req.body;
  
      // Find the company and check the number of users allowed
      const company = await companySchema.findOne({companyId}); // Replace 'Your Company Name' with the actual company name
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
  
      if (company.users.some(user => user.fullName === fullName)) {
        return res.status(409).json({ error: 'Full name already exists' });
      }
  
      if (company.users.some(user => user.email === email)) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      if (company.users.length >= company.maxAllowedUsers) {
        return res.status(400).json({ error: 'Maximum number of users exceeded' });
      }
  
      // Create a new user
      const user = {
        fullName,
        email,
        contactNumber,
        userLevel,
        password
      };
  
      // Add the user to the users array in the company profile
      company.users.push(user);
  
      // Save the updated company profile to the database
      await company.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error occurred during user registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  router.post('/payment', async (req, res) => {
    try {
      const { companyId, paymentMethod, bankAccountNumber } = req.body;
  
      // Find the company and check the maximum number of users
      const company = await companySchema.findOne({ companyId });
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
  
      const numberOfUsers = company.users.length;
      const userCost = 1000;
      const totalAmount = numberOfUsers * userCost;
  
      // Process the payment based on the selected payment method
      let paymentStatus;
      if (paymentMethod === 'bank') {
        if (!bankAccountNumber) {
          return res.status(400).json({ error: 'Bank account number is required for payment' });
        }
        paymentStatus = 'Bank account payment processed';
      } else if (paymentMethod === 'easypaisa') {
        paymentStatus = 'EasyPaisa payment processed';
      } 
      else if (paymentMethod === 'jazzcash') {
        paymentStatus = 'JazzCash payment processed';
      } else {
        return res.status(400).json({ error: 'Invalid payment method' });
      }
  
      // Save the payment details in the company profile
      company.payment = {
        method: paymentMethod,
        bankAccountNumber: bankAccountNumber || '',
        jazzCashNumber: bankAccountNumber || '',
        easypaisaNumber: bankAccountNumber || '', // Dummy data, can be left empty for non-JazzCash payments
        amount: totalAmount,
        status: paymentStatus,
      };
  
      // Save the updated company profile to the database
      await company.save();
  
      res.status(200).json({ message: 'Payment processed successfully' });
    } catch (error) {
      console.error('Error occurred during payment processing:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
module.exports = router;