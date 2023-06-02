const express = require("express");
// const { v4: uuidv4 } = require('uuid');
const { userAuthorization } = require("../middlewares/auth.middleware");
const {
  createNewLeadValidation,
  replyLeadMessageValidation,
} = require("../middlewares/formValidation.middleware");
const {
  insertLeads,
  getLeads,
  getLeadsById,
  deleteLead,
  updateClientReply,
  updateStatusClose,
  generateLeadsReport,
  saveStaffInfo,
  insertStaff,
  insertCust,
  insertCat,
  generateStaffId,
  getCust,
  generateLeadId,
  generateLeadMId
} = require("../model/leads/leads.model");

const { getStaff }=require("../model/leads/leads.model");

const { LeadsSchema } = require("../model/leads/leads.schema");
const LeadCategorySchema  = require("../model/leads/category.Schema");
const mongoose = require("mongoose");
const {
  isAdmin,
  isLeadManager,
} = require("../middlewares/userRights.middleware");
const StaffSchema  = require("../model/leads/Staff.schema");
const multer = require("multer");
const path = require("path");
const leadinfoSchema = require("../model/leads/leadinfo.Schema");
const LeadManager = require("../model/leads/LeadManger");

const { UserSchema } = require("../model/user/User.schema");
const customerSchema = require("../model/leads/customer.Schema");

const router = express.Router();

//for attaching file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

//create company endpoint

router.post("/", userAuthorization, async (req, res) => {
  try {
    //receive new ticket data
    const {
      leadName,
      sender,
      subject,
      wealth,
      experience,
      currentBusinesses,
      mostPreferedBusinesses,
      source,
      assignedTo,
      message,
    } = req.body;

    const userId = req.userId;
    const assignedToId = mongoose.Types.ObjectId(assignedTo);

    const leadsObj = {
      clientId: userId,
      leadName,
      sender,
      subject,
      wealth,
      experience,
      currentBusinesses,
      mostPreferedBusinesses,
      assignedTo: assignedToId,
      message,
      source,
      conservation: [
        {
          sender,
          message,
        },
      ],
    };
    const result = await insertLeads(leadsObj);
    // console.log(result)
    //insert in mongodb

    if (result._id) {
      return res.json({
        status: "success",
        message: "new lead have been created",
      });
    }

    res.json({
      status: "error",
      message: "Unable to create ticket please try again later",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});



//post-> get -> edit -> create -> delete

// POST route to save staff  infodata
router.post('/staff-info', async (req, res) => {
  try {
    const {  staffName, mobileNo, email, designation, department } = req.body;
// Generate a unique staff ID
const staffId = generateStaffId();
    // Create a new staff object
    const staffObj = ({
      staffId,
      staffName,
      mobileNo,
      email,
      designation,
      department
    });

    // Save the staff object in the database
    const savedStaff = await insertStaff(staffObj);

    return res.json({ message: 'Staff data saved successfully', staff: savedStaff });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get staff->
router.get('/staff-info', async (req, res) => {
  try {
    // Retrieve staff information
    const staff = await getStaff();

    return res.json({ staff });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//edit staff wor
router.put('/staff-info/:staffId', async (req, res) => {
  try {
    const { staffId } = req.params;
    const { staffName, mobileNo, email } = req.body;

    // Find the staff by staffId and update the information
    const updatedStaff = await StaffSchema.findOneAndUpdate(
      { staffId },
      { staffName, mobileNo, email },
      { new: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ error: 'Staff not found' });
    }

    return res.json({ message: 'Staff information updated successfully', staff: updatedStaff });
  } catch (error) {
    console.log('Error in edit staff-info endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//view staff
router.get('/staff-info/:staffId', async (req, res) => {
  try {
    const { staffId } = req.params;

    // Retrieve staff information for the specified staffId
    const staff = await StaffSchema.findOne({ staffId });

    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }

    return res.json({ staff });
  } catch (error) {
    console.log('Error in view staff-info endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//delete staff-info endpoint
router.delete('/staff-info/:staffId', async (req, res) => {
  try {
    const { staffId } = req.params;

    // Delete staff information for the specified staffId
    const deletedStaff = await StaffSchema.findOneAndDelete({ staffId });

    if (!deletedStaff) {
      return res.status(404).json({ error: 'Staff not found' });
    }

    return res.json({ message: 'Staff deleted successfully' });
  } catch (error) {
    console.log('Error in delete staff-info endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//post-> get -> edit -> create -> delete
//customer info
router.post("/CustomerInfo", async (req, res) => {
  try {
    //new customer info
    const {
      CompanyName,
      Telephone,
      email,
      website,
      contactPersonName,
      contactPersonMobileNumber,
      contactPersonEmail,
      otherDetails,
      country,
      State,
      city,
    } = req.body;

    const userId = req.userId;

    const custObj = {
      clientId: userId,
      CompanyName,
      Telephone,
      email,
      website,
      contactPersonName,
      contactPersonMobileNumber,
      contactPersonEmail,
      otherDetails,
      country,
      State,
      city,
    };
    const result = await insertCust(custObj);
    // console.log(result)
    //insert in mongodb

    if (result._id) {
      return res.json({
        status: "success",
        message: "new client have been created",
      });
    }

    res.json({
      status: "error",
      message: "Unable to create client please try again later",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// get customer
router.get("/CustomerInfo", async (req, res) => {
  try {
    const userId = req.userId;

    // Retrieve specific fields from the database
    const result = await getCust(userId, [
      "CompanyName",
      "Telephone",
      "email",
      "contactPersonName",
      "contactPersonMobileNumber",
    ]);

    if (result) {
      return res.json({
        status: "success",
        data: result,
      });
    }

    res.json({
      status: "error",
      message: "Unable to retrieve customer information",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//edit customer
router.put("/CustomerInfo/:customerId", async (req, res) => {
  try {
    const userId = req.userId;
    const customerId = req.params.customerId;

    // Retrieve the updated fields from the request body
    const {
      CompanyName,
      Telephone,
      email,
      contactPersonName,
      contactPersonMobileNumber
    } = req.body;

    // Find the customer document based on the customerId and userId
    const customer = await customerSchema.findOne({ _id: customerId, clientId: userId });

    if (!customer) {
      return res.json({
        status: "error",
        message: "Customer not found"
      });
    }

    // Update the fields with the new values
    customer.CompanyName = CompanyName;
    customer.Telephone = Telephone;
    customer.email = email;
    customer.contactPersonName = contactPersonName;
    customer.contactPersonMobileNumber = contactPersonMobileNumber;

    // Save the updated customer document
    await customer.save();

    return res.json({
      status: "success",
      message: "Customer information updated successfully",
      data: customer
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//view only customer
router.get("/CustomerInfo/:customerId", async (req, res) => {
  try {
    const userId = req.userId;
    const customerId = req.params.customerId;

    // Find the customer document based on the customerId and userId
    const customer = await customerSchema.findOne({ _id: customerId, clientId: userId });

    if (!customer) {
      return res.json({
        status: "error",
        message: "Customer not found"
      });
    }

    return res.json({
      status: "success",
      data: customer
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//delete customer
router.delete("/CustomerInfo/:customerId", async (req, res) => {
  try {
    const userId = req.userId;
    const customerId = req.params.customerId;

    // Find the customer document based on the customerId and userId
    const customer = await customerSchema.findOne({ _id: customerId, clientId: userId });

    if (!customer) {
      return res.status(404).json({
        status: "error",
        message: "Customer not found"
      });
    }

    // Delete the customer document
    await customerSchema.deleteOne({ _id: customerId, clientId: userId });

    return res.json({
      status: "success",
      message: "Customer deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Error deleting customer" });
  }
});

// POST route to save lead category and status
router.post("/leadsCategory", async (req, res) => {
  try {
    const { category, status } = req.body;
    // Validate the required fields

    if (!category || !status) {
      res.status(400).json({ error: "Please provide all the required fields" });
      return;
    }

    // Create a new Lead instance
    const catOBJ = {
      category,
      status,
    };

    // Save the lead to the database
    await insertCat(catOBJ);

    res.status(201).json({ message: "Lead category saved successfully" });
  } catch (error) {
    console.error("Error saving lead:", error);
    res.status(500).json({ error: "Error saving lead" });
  }
});

//get leadsCategory
router.get("/leadsCategory", async (req, res) => {
  try {
    // Fetch the lead categories with only 'category' and 'status' fields from the database
    const leadCategories = await LeadCategorySchema.find({}, "category status");

    res.json({
      status: "success",
      data: leadCategories,
    });
  } catch (error) {
    console.error("Error fetching lead categories:", error);
    res.status(500).json({ error: "Error fetching lead categories" });
  }
});

//edit lead category
router.put("/leadsCategory/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const { category, status } = req.body;

    // Find the lead category document based on the categoryId
    const leadCategory = await LeadCategorySchema.findById(categoryId);

    if (!leadCategory) {
      return res.status(404).json({
        status: "error",
        message: "Lead category not found",
      });
    }

    // Update the fields with the new values
    leadCategory.category = category;
    leadCategory.status = status;

    // Save the updated lead category document
    await leadCategory.save();

    return res.json({
      status: "success",
      message: "Lead category updated successfully",
      data: leadCategory,
    });
  } catch (error) {
    console.error("Error updating lead category:", error);
    res.status(500).json({ error: "Error updating lead category" });
  }
});

//view only lead category by id
router.get("/leadsCategory/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Find the lead category document based on the categoryId
    const leadCategory = await LeadCategorySchema.findById(categoryId);

    if (!leadCategory) {
      return res.status(404).json({
        status: "error",
        message: "Lead category not found",
      });
    }

    return res.json({
      status: "success",
      data: leadCategory,
    });
  } catch (error) {
    console.error("Error fetching lead category:", error);
    res.status(500).json({ error: "Error fetching lead category" });
  }
});

//delete lead category
router.delete("/leadsCategory/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Delete the lead category document based on the categoryId
    const result = await LeadCategorySchema.deleteOne({ _id: categoryId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Lead category not found",
      });
    }

    return res.json({
      status: "success",
      message: "Lead category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting lead category:", error);
    res.status(500).json({ error: `Error deleting lead category: ${error.message}` });
  }
});

//lead info route
// API route to save lead information

router.post("/leads-Info", upload.single("attachment"), async (req, res) => {
  const {
    companyName,
    leadTitle,
    leadSource,
    status,
    referralName,
    description,
    staffName,
    otherDetails,
    followUpDate,
    followUpTime
  } = req.body;

  const validStatusOptions = [
    "Working",
    "Contacted",
    "Qualified",
    "Failed",
    "Closed",
  ];

  try {
    const leadInfoId = generateLeadId(); // Generate a unique ID using the uuid package

    // Create a new lead instance using the Lead schema
    const lead = new leadinfoSchema({
      companyName,
      leadTitle,
      leadSource,
      referralName,
      description,
      status,
      staffName,
      otherDetails,
      followUpDate,
      followUpTime,
      leadInfoId:leadInfoId,
      attachment: req.file ? req.file.path : "",
    });

    if (status && !validStatusOptions.includes(status)) {
      return res.status(400).json({
        error: "Invalid status option. Please choose one of the valid options: Working, Contacted, Qualified, Failed, Closed.",
      });
    }

    // Save the lead to the database
    await lead.save();

    res.status(201).json({ message: "Lead information saved successfully" });
  } catch (error) {
    console.error("Error saving lead information:", error);
    res.status(500).json({ error: "Error saving lead information" });
  }
});


//get leads
router.get("/leads-Info", async (req, res) => {
  try {
    // Fetch specific fields from the lead information
    const leadFields = await leadinfoSchema.find({}, "companyName staffName leadTitle leadSource status referralName");

    res.json({
      status: "success",
      data: leadFields,
    });
  } catch (error) {
    console.error("Error fetching lead information:", error);
    res.status(500).json({ error: "Error fetching lead information" });
  }
});

//edit lead
router.put("/leads-Info/:leadInfoId", upload.single("attachment"), async (req, res) => {
  const leadInfoId = req.params.leadInfoId;
  const {
    companyName,
    leadTitle,
    status,
    leadSource,
    staffName
  } = req.body;

  try {
    // Find the lead information document based on the leadInfoId
    
    const leadInfo = await leadinfoSchema.findById(leadInfoId);

    if (!leadInfo) {
      return res.status(404).json({
        status: "error",
        message: "Lead information not found",
      });
    }

    // Update the fields with the new values
    leadInfo.companyName = companyName;
    leadInfo.leadTitle = leadTitle;
    leadInfo.leadSource = leadSource;
    leadInfo.staffName = staffName;
    leadInfo.status = status;


    // Update the attachment if a new file is provided
    if (req.file) {
      leadInfo.attachment = req.file.path;
    }

    // Save the updated lead information document
    await leadInfo.save();

    return res.json({
      status: "success",
      message: "Lead information updated successfully",
      data: leadInfo,
    });
  } catch (error) {
    console.error("Error updating lead information:", error);
    res.status(500).json({ error: "Error updating lead information" });
  }
});

//view only lead information
router.get("/leads-Info/:leadInfoId", async (req, res) => {
  try {
    const leadInfoId = req.params.leadInfoId;

    // Find the lead information document based on the leadInfoId
    const leadInfo = await leadinfoSchema.findById(leadInfoId);

    if (!leadInfo) {
      return res.status(404).json({
        status: "error",
        message: "Lead information not found",
      });
    }

    return res.json({
      status: "success",
      data: leadInfo,
    });
  } catch (error) {
    console.error("Error fetching lead information:", error);
    res.status(500).json({ error: "Error fetching lead information" });
  }
});

//delete lead information
router.delete("/leads-Info/:leadInfoId", async (req, res) => {
  try {
    const leadInfoId = req.params.leadInfoId;

    // Delete the lead information document based on the leadInfoId
    const deletedLeadInfo = await leadinfoSchema.findByIdAndDelete(leadInfoId);

    if (!deletedLeadInfo) {
      return res.status(404).json({
        status: "error",
        message: "Lead information not found",
      });
    }

    return res.json({
      status: "success",
      message: "Lead information deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting lead information:", error);
    res.status(500).json({ error: "Error deleting lead information" });
  }
});

//lead-assign 
// API route to add LeadInfo to LeadManager
router.post('/assign-lead', async (req, res) => {
  try {
    const { leadInfoIds , leadManagerId} = req.body;

    
    // Step 1: Get data of LeadInfo based on LeadInfoID
    const leadInfos = await leadinfoSchema.find({ leadInfoId:{ $in: leadInfoIds} });
    

    if (leadInfos) {
      res.status(200).json({ message: 'LeadInfos assigned to LeadManager successfully' });
    }

    if (!leadInfos) {
      return res.status(404).json({ message: 'LeadInfos not found' });
    }

    // Step 2: Search LeadManager based on LeadManagerID
    const leadManager = await leadManger.findOne({ leadManagerId: leadManagerId });

    if (!leadManager) {
      return res.status(404).json({ message: 'LeadManager not found' });
    }

    // Step 3: Push LeadInfo into leadInfo array in LeadManager Schema
  //   leadManager.leadInfo.push(leadInfo);
  //   await leadManager.save();

  //   res.status(200).json({ message: 'LeadInfo added to LeadManager successfully' });
  // } 
  // catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Internal server error' });

  const missingLeadInfos = leadInfoIds.filter((leadInfoId) => !leadInfos.some((leadInfo) => leadInfo.leadInfoId === leadInfoId));
  if (missingLeadInfos.length > 0) {
    return res.status(404).json({ message: `LeadInfo with IDs ${missingLeadInfos.join(', ')} not found` });
  }

  // Step 4: Assign LeadInfo to LeadManager
  leadManager.leadInfo.push(...leadInfos);
  await leadManager.save();

  res.status(200).json({ message: 'Leads assigned to LeadManager successfully' });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
  }
});

// Add Lead Manager 
router.post('/addLeadManager', async (req, res) => {
  try {
    const leadMId=generateLeadMId();
    const {
      leadManagerId,
      leadManagerName,
    } = req.body;

    // Create a new LeadManager object
    const newLeadManager = new LeadManager({
      leadManagerId:leadMId,
      leadManagerName,
    });

    // Save the new LeadManager to the database
    const savedLeadManager = await newLeadManager.save();

    res.status(201).json(savedLeadManager);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/followup", async (req, res) => {
  const { status } = req.query;

  const validStatusOptions = [
    "Working",
    "Contacted",
    "Qualified",
    "Failed",
    "Closed",
  ];

  try {
    // Check if the provided status is valid
    if (status && !validStatusOptions.includes(status)) {
      return res
        .status(400)
        .json({
          error:
            "Invalid status option. Please choose one of the valid options.that are 1-Working, 2-Contacted, 3-Qualified, 4-Failed, 5-Closed.",
        });
    }

    // Define the filter object based on the provided status
    const filter = status ? { status: status } : {};

    // Retrieve the filtered leads from the database
    const filteredLeads = await leadinfoSchema.find(filter);

    res.status(200).json({ leads: filteredLeads });
  } catch (error) {
    console.error("Error filtering leads:", error);
    res.status(500).json({ error: "Error filtering leads" });
  }
});


// Update lead status
router.put("/followup/:leadId", async (req, res) => {
  const { leadId } = req.params;
  const { status } = req.body;

  const validStatusOptions = [
    "Working",
    "Contacted",
    "Qualified",
    "Failed",
    "Closed",
  ];

  try {
    // Find the lead by ID
    const lead = await leadinfoSchema.findById(leadId);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    // Check if the provided status is valid
    if (!validStatusOptions.includes(status)) {
      return res
        .status(400)
        .json({
          error:
            "Invalid status option. Please choose one of the valid options.that are 1-Working, 2-Contacted, 3-Qualified, 4-Failed, 5-Closed",
        });
    }

    // Update the lead status
    lead.status = status;

    // Save the updated lead
    await lead.save();

    res
      .status(200)
      .json({ message: `Lead status updated successfully to ${lead.status}` });
  } catch (error) {
    console.error("Error updating lead status:", error);
    res.status(500).json({ error: "Error updating lead status" });
  }
});


//get follow up
router.get("/followup/:leadId", async (req, res) => {
  const { leadId } = req.params;

  try {
    // Find the lead by ID
    const lead = await leadinfoSchema.findById(leadId);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    // Retrieve additional information from the lead
    const { companyName, leadTitle, leadSource, status } = lead;

    res.status(200).json({
      companyName,
      leadTitle,
      leadSource,
      status,
    });
  } catch (error) {
    console.error("Error retrieving lead information:", error);
    res.status(500).json({ error: "Error retrieving lead information" });
  }
});


//view only follow up
router.get("/followup/:leadId", async (req, res) => {
  const { leadId } = req.params;

  try {
    // Find the lead by ID
    const lead = await leadinfoSchema.findById(leadId);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.status(200).json({ status: lead.status });
  } catch (error) {
    console.error("Error retrieving lead status:", error);
    res.status(500).json({ error: "Error retrieving lead status" });
  }
});


//Status-based filter
router.get("/status-based-filter", async (req, res) => {
  const { status } = req.query;

  const validStatusOptions = [
    "Working",
    "Contacted",
    "Qualified",
    "Failed",
    "Closed",
  ];

  try {
    // Check if the provided status is valid
    if (status && !validStatusOptions.includes(status)) {
      return res
        .status(400)
        .json({
          error:
            "Invalid status option. Please choose one of the valid options.that are 1-Working, 2-Contacted, 3-Qualified, 4-Failed, 5-Closed.",
        });
    }

    // Define the filter object based on the provided status
    const filter = status ? { status: status } : {};

    // Retrieve the filtered leads from the database
    const filteredLeads = await leadinfoSchema.find(filter);

    res.status(200).json({ leads: filteredLeads });
  } catch (error) {
    console.error("Error filtering leads:", error);
    res.status(500).json({ error: "Error filtering leads" });
  }
});

//Reports
router.post('/reports', async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Filter leads based on follow-up date and project only status and companyName fields
    const filteredLeads = await leadinfoSchema.find(
      {
        followUpDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      },
      'status companyName' // Projection: Include only status and companyName fields
    );

    res.status(200).json(filteredLeads);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/", userAuthorization, async (req, res) => {
  try {
    const userId = req.userId;

    const result = await getLeads(userId);
    console.log(result);
    //insert in mongodb

    return res.json({ status: "success", result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});


//get single lead by id
router.get("/:_id", userAuthorization, async (req, res) => {
  console.log(req.params);
  try {
    const clientId = req.userId;
    const { _id } = req.params;
    const result = await getLeadsById(_id, clientId);
    console.log(result);
    //insert in mongodb

    return res.json({ status: "success", result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//update the lead status after client reply
router.put("/:_id",replyLeadMessageValidation,userAuthorization,async (req, res) => {
    try {
      const { message, sender } = req.body;
      const clientId = req.userId;
      const { _id } = req.params;
      const result = await updateClientReply({ _id, message, sender });
      console.log(result);
      //insert in mongodb
      if (result._id) {
        return res.json({
          status: "success",
          message: "your message have been updated",
        });
      }
      return res.json({
        status: "success",
        message: "Unable to update your message please try again later ",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }
);


router.patch("/close-lead/:_id", userAuthorization, async (req, res) => {
  try {
    const clientId = req.userId;
    const { _id } = req.params;

    // Check if _id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid _id parameter" });
    }

    // Find the lead by _id and clientId
    const lead = await LeadsSchema.findOne({ _id, clientId });

    // Check if the lead exists
    if (!lead) {
      return res
        .status(404)
        .json({ status: "error", message: "Lead not found" });
    }

    // Check if the lead is already closed
    if (lead.status === "closed") {
      return res.json({ status: "success", message: "Lead is already closed" });
    }

    // Update the lead status to closed
    lead.status = "closed";
    await lead.save();

    return res.json({ status: "success", message: "Lead has been closed" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});


//Delete  the lead which have been closed
router.delete("/:_id", userAuthorization, async (req, res) => {
  try {
    const clientId = req.userId;
    const { _id } = req.params;
    const result = await deleteLead({ _id, clientId });
    console.log(result);
    //insert in mongodb

    return res.json({
      status: "success",
      message: "your lead have been deleted from our system",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});


//fetch all the leads of status closed
router.get("/filtering/:status", userAuthorization, async (req, res) => {
  const { status } = req.params;
  const filter = {};
  if (status) {
    filter.status = status;
  }
  try {
    const leads = await LeadsSchema.find(filter);
    console.log(filter);
    res.send(leads);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


const filterSchema = {
  type: "object",
  properties: {
    wealth_min: { type: "number" },
    wealth_max: { type: "number" },
    experience_min: { type: "number" },
    experience_max: { type: "number" },
    current_business: { type: "string" },
    preferred_businesses: { type: "string" },
  },
};

// Define the endpoint to filter the leads
router.post("/filter_leads", userAuthorization, async (req, res) => {
  try {
    // Validate the filter criteria against the schema
    const ajv = new (require("ajv"))();
    const validate = ajv.compile(filterSchema);
    if (!validate(req.body)) {
      return res.status(400).json({ error: "Invalid filter criteria" });
    }

    // Build the filter query
    const filter = {};
    if (req.body.wealth_min !== undefined) {
      filter.wealth = { $gte: req.body.wealth_min };
    }
    if (req.body.wealth_max !== undefined) {
      filter.wealth = { ...filter.wealth, $lte: req.body.wealth_max };
    }
    if (req.body.experience_min !== undefined) {
      filter.experience = { $gte: req.body.experience_min };
    }
    if (req.body.experience_max !== undefined) {
      filter.experience = {
        ...filter.experience,
        $lte: req.body.experience_max,
      };
    }
    if (req.body.current_business !== undefined) {
      filter.currentBusinesses = req.body.current_business;
    }
    if (req.body.preferred_businesses !== undefined) {
      filter.mostPreferedBusinesses = {
        $regex: new RegExp(req.body.preferred_businesses, "i"),
      };
    }

    // Find the leads matching the filter criteria
    const leads = await LeadsSchema.find(filter);
    if (leads) {
      return res.json(leads);
    }
    return res.json("no leads found");
    // Return the filtered leads
    // return res.json(leads);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Define the endpoint to retrieve the filter options
router.get("/filter_options", async (req, res) => {
  try {
    // Retrieve the distinct values of the relevant fields from the leads collection
    const wealthOptions = await LeadsSchema.distinct("wealth");
    const experienceOptions = await LeadsSchema.distinct("experience");
    const currentBusinessOptions = await LeadsSchema.distinct(
      "current_business"
    );
    const preferredBusinessesOptions = await LeadsSchema.distinct(
      "preferred_businesses"
    );

    // Return the filter options

    return res.json({
      wealth_options: wealthOptions,
      experience_options: experienceOptions,
      current_business_options: currentBusinessOptions,
      preferred_businesses_options: preferredBusinessesOptions,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});




// Route for printing staff information(not working)
router.get("/staff-wise", userAuthorization, async (req, res) => {
  try {
    // Retrieve staff information from the database
    const staffList = await StaffSchema.find({});

    // Print staff information or perform any desired action
    console.log(staffList);

    res.status(200).json({ message: "Staff information printed" });
  } catch (error) {
    console.error("Error retrieving staff information:", error);
    res.status(500).json({ error: "Error retrieving staff information" });
  }
});

module.exports = router;
