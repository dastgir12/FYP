const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error("Redis client error:", error);
});
// client.connect().catch(console.error)
const setJWT = (key, value) => {
  return new Promise((resolve, reject) => {
    if (client.connected === false) {
      console.error("Redis client is not connected.");
      reject(new Error("Redis client is not connected."));
      return;
    }

    const setCallback = (err, resp) => {
      if (err) {
        console.error(`Error setting Redis key ${key}:`, err);
        reject(new Error(`Error setting Redis key ${key}: ${err.message}`));
      } else {
        resolve(resp);
      }
    };

    try {
      client.set(key, value, setCallback);
    } catch (error) {
      console.error(`Error setting Redis key ${key}:`, error);
      reject(new Error(`Error setting Redis key ${key}: ${error.message}`));
    }
  });
};

const getJWT = (key) => {
  return new Promise((resolve, reject) => {
    if (client.connected === false) {
      console.error("Redis client is not connected.");
      reject(new Error("Redis client is not connected."));
      return;
    }

    try {
      client.get(key, (err, resp) => {
        if (err) {
          console.error(`Error getting Redis key ${key}:`, err);
          reject(new Error(`Error getting Redis key ${key}: ${err.message}`));
        } else {
          resolve(resp);
        }
      });
    } catch (error) {
      console.error(`Error getting Redis key ${key}:`, error);
      reject(new Error(`Error getting Redis key ${key}: ${error.message}`));
    }
  });
};

const deleteJWT = (key) => {
  return new Promise((resolve, reject) => {
    if (client.connected === false) {
      console.error("Redis client is not connected.");
      reject(new Error("Redis client is not connected."));
      return;
    }

    try {
      client.del(key, (err, resp) => {
        if (err) {
          console.error(`Error deleting Redis key ${key}:`, err);
          reject(new Error(`Error deleting Redis key ${key}: ${err.message}`));
        } else {
          resolve(resp);
        }
      });
    } catch (error) {
      console.error(`Error deleting Redis key ${key}:`, error);
      reject(new Error(`Error deleting Redis key ${key}: ${error.message}`));
    }
  });
};

module.exports = { getJWT, setJWT, deleteJWT };
