const StaffSchema = require("./Staff.schema");
const customerSchema = require("./customer.Schema");
const LeadCategorySchema = require("./category.Schema");
const { LeadsSchema } = require("./leads.schema");

// Assuming you have a database connection and a User model defined

// Function to get a user by ID from the database
// const getUserById = async (userId) => {
//     try {
//       const user = await UserSchema.findById(userId);
//       return user;
//     } catch (error) {
//       console.error('Error occurred while fetching user by ID:', error);
//       throw new Error('Failed to fetch user by ID');
//     }
//   };
  
 
  


//inset staff
const insertStaff = staffObj =>{

    return new Promise((resolve,reject)=>{
        try {
            StaffSchema(staffObj)
            .save()
            .then((data)=>{
                resolve(data)
                
            })
            .catch((error)=>{
                reject(error)
            })
        
        } catch (error) {

            reject(error)
            
        }
    })
   
}

//get staff
const getStaff = () => {
    return new Promise((resolve, reject) => {
      try {
        StaffSchema.find({}, 'staffId staffName mobileNo email')
          .then(staff => {
            resolve(staff);
          })
          .catch(error => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
  
  

// Function to generate a unique staff ID
function generateStaffId() {
    const prefix = 'S'; // Prefix for staff ID
    const randomNumber = Math.floor(100 + Math.random() * 900); // Generate a 3-digit random number
    return `${prefix}${randomNumber}`;
  }

function generateLeadId() {
    const prefix = 'S'; // Prefix for staff ID
    const randomNumber = Math.floor(100 + Math.random() * 900); // Generate a 3-digit random number
    return `${prefix}${randomNumber}`;
  }


  function generateLeadMId() {
    const prefix = 'S'; // Prefix for staff ID
    const randomNumber = Math.floor(100 + Math.random() * 900); // Generate a 3-digit random number
    return `${prefix}${randomNumber}`;
  }
//inset categories
const insertCat = catOBJ =>{

    return new Promise((resolve,reject)=>{
        try {
            LeadCategorySchema(catOBJ)
            .save()
            .then((data)=>{
                resolve(data)
                
            })
            .catch((error)=>{
                reject(error)
            })
        
        } catch (error) {

            reject(error)
            
        }
    })
   
}

const getCust = async (userId, fields) => {
    try {
      // Your database query logic here to fetch the specified fields for the given userId
      // Modify the code according to your specific database implementation
      const result = await customerSchema.find({ clientId: userId }).select(fields.join(' '));
  
      return result;
    } catch (error) {
      throw new Error("Unable to retrieve customer information");
    }
  };
  

//inset customer
const insertCust = custObj =>{

    return new Promise((resolve,reject)=>{
        try {
            customerSchema(custObj)
            .save()
            .then((data)=>{
                resolve(data)
                
            })
            .catch((error)=>{
                reject(error)
            })
        
        } catch (error) {

            reject(error)
            
        }
    })
   
}



// Function to generate the leads report
function generateLeadsReport(leads) {
    // Perform necessary calculations and formatting to generate the report
    const report = {
      totalLeads: leads.length,
      leads: leads.map(lead => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        status: lead.status,
        closed: lead.closed
      }))
    };
  
    return report;
  }

//inset leads
const insertLeads = leadsObj =>{

    return new Promise((resolve,reject)=>{
        try {
            LeadsSchema(leadsObj)
            .save()
            .then((data)=>{
                resolve(data)
                
            })
            .catch((error)=>{
                reject(error)
            })
        
        } catch (error) {

            reject(error)
            
        }
    })
   
}

//inset user leads
const insertUserLeads = leadsUserObj =>{

    return new Promise((resolve,reject)=>{
        try {
            LeadsSchema(leadsUserObj)
            .save()
            .then((data)=>{
                resolve(data)
                
            })
            .catch((error)=>{
                reject(error)
            })
        
        } catch (error) {

            reject(error)
            
        }
    })
   
}

//get Leads
const getLeads = clientId =>{

    return new Promise((resolve,reject)=>{
        try {
            LeadsSchema
            .find({clientId})
            .then((data)=>{
                resolve(data)
                
            })
            .catch((error)=>{
                reject(error)
            })
        
        } catch (error) {

            reject(error)
            
        }
    })
   
}

//get Leads by id
const getLeadsById = (_id,clientId) =>{

    return new Promise((resolve,reject)=>{
        try {
            LeadsSchema
            .findOne({_id,clientId})
            .then((data)=>{
                resolve(data)
                
            })
            .catch((error)=>{
                reject(error)
            })
        
        } catch (error) {

            reject(error)
            
        }
    })
   
}

//update Leads
const updateClientReply = ({_id,message,sender}) =>{

    return new Promise((resolve,reject)=>{
        try {
            LeadsSchema.findOneAndUpdate(
                {_id},
                {
                    status:"pending operator response",
                    $push:{
                        conservation:[
                            {
                                message,
                                sender
                    }]
                        }
                },
                {new:true}
            
            )
            .then((data)=>{
                resolve(data)
                
            })
            .catch((error)=>{
                reject(error)
            })
        
        } catch (error) {

            reject(error)
            
        }
    })
   
}

//update close Leads
const  updateStatusClose = ({_id,clientId}) =>{

    return new Promise((resolve,reject)=>{
        try {
            LeadsSchema.findOneAndUpdate(
                {_id, clientId},
                {
                    status:"closed",
                },
                {new:true}
            
            )
            .then((data)=>{
                resolve(data)
                })
            .catch((error)=>{
                reject(error)
            })
        
        } catch (error) {

            reject(error)
            
        }
    })
   
}

//delete Lead
const  deleteLead = ({_id,clientId}) =>{

    return new Promise((resolve,reject)=>{
        try {
            LeadsSchema.findOneAndDelete(
                {_id, clientId},
                
            
            )
            .then((data)=>{
                resolve(data)
                
            })
            .catch((error)=>{
                reject(error)
            })
        
        } catch (error) {

            reject(error)
            
        }
    })
   
}

async function getStaffByDepartment(department) {
    try {
      const staffMembers = await StaffSchema.find({ department: department }).exec();
      return staffMembers;
    } catch (error) {
      console.error('Error occurred while retrieving staff members:', error);
      throw error;
    }
  }
  

  
  
//exports 
module.exports={
    insertLeads,
    getLeads,
    getLeadsById,
    updateClientReply,
    updateStatusClose,
    deleteLead,
    insertUserLeads,
    generateLeadsReport,
    insertStaff,
    insertCust,
    insertCat,
 
    getStaff,
    generateStaffId,
    getCust,
    generateLeadId,
    generateLeadMId,
    getStaffByDepartment
}