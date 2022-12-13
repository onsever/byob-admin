import vision from "@google-cloud/vision";
import bcrypt from "bcrypt";

import adminModel from "../model/admin.js";
import tokenHelper from "../utils/tokenHelper.js";
import User from "../model/user.js";

const CREDENTIALS = JSON.parse(
  JSON.stringify({
    type: "service_account",
    project_id: "byob-370302",
    private_key_id: "c5d8005fc21ac84b6a6cff89359f8d35ea8fe7e0",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+VLR1P5g5scUX\neyznxyNJ1p8/BuyyJdfDTidjOrahpHs61SKCqFIBZMw6rXxSQwQBveAR05zJSXax\nXckx/IZspvIP74/aM8nLxo0OcY3WvCZQz042WkbMA1WwiUa9zyIkkMAv/GJsg7Br\ndjsNoM5/aG+frtFS7GpdFwU2SpQkteqKFqbqsqL5qjhhgkVtdYJ5XLe6roIURZZL\nMqsYXtbLocNcFLRrXxO8Aamm8TW6Hs8aQzi4/vsk2JfU47Np4LmW+6eebqClvc8Z\nCUbThr2l7m2Jeb8MD1vNRO2UektsFAcJKyKA2K+H8edhYQ4p1ymR33VFBB+sU3KV\nb6cAZzZ3AgMBAAECggEATQk/2U0aMg/v9CcY7988O0CxR/NnjluezyAs9Q7oqNhI\nQHHP/A5g0suXlhBuB2W0k3fk35JFHXusnPGW47KQPh38T9Lo6KqZfO8qXLQ9crLI\n12BxCbLUgPLAlimaBm12JlKoV0PSGpXarEQ4drWlnxAIThuWAfhKvM76fxUEjS6Z\nwOQGg3UFzStFxwNWcZQSu+mk2XOSbZYFtGao7qMPwFWsqGA0ZPihh3FKET1Zvr8c\nHX6RSlTyzAbEfL6OGCt9IwsiLdbK/ImAkxvFde6vt3LuAFE7CJ7sBulvrXGtMh7z\nmitorRU2HTM+YNTzbb+CSuHQ7wx40JUSl/kSkYwigQKBgQDf4kFW+uv0Ke/f41VR\nyPo5HPAsdPlrazlCwsGg9uRsvk+cAP/clJvUaCxokDEf+w+/DACmjvXqneNYazgY\nl/V/A8O4h+47qqBqE4gzcULCHxKc0qwgbQB+nn/6F01ZzFzx95Qbq1lT7bxzz+ol\nQWWVlgNfg14d2shmoe6wTpq0IQKBgQDZokbGKk2+rPlqNY0oQBtuRChwmx0lUYx1\nZ1Dtg1Gz9urDfNntMdaLW0uAfX/gqlb5FKliWEyv7nVjM/te/yWkjmPzF+HDn8sP\nx15J0V2KoRB05xCuLhW/nSlfb38uxiTG9nYNEE+ruGI8WFF7Jq7XdY5+U0lSM07V\nPWACnfgXlwKBgDekY9jaRApK4fMi7PGGoanQJ2DlMZgg7fpJrRX0RpFAO0jqdqy7\nwn7n5SGXtJ3eJ+uzb/X1UekdlINFIov6OGl45gvWvL7XiUbT0+X1IEJetqGDOoRU\nkurlOalOYUsQH4mDnqvBylGxpESkR+06c6TZw7zZSWriFSxs0oW/A3QBAoGAPfc6\nd4nsAPJ3QYpl2qQGK2s0qHtB3TJO786u+DF/veH8DhUqZ6LdF2izIq6ZDnrxsJH1\neI7zptQakFhopi+3pBb21mxiV7TTuHZnnlUCcUpSyTZRRYbRonE5KncwmzzHk+7w\nxd9zD828CrqK2Km29pn+LHHCWqlJNOX4xEX+MZkCgYEAiwN2Rb1kOB+qZS//Kzvr\nJuOchpvaHLHe22cNks+c7WNI1yagfvbdmZzfvCCym6lHVoJhO7rKtT03TH0TxSIo\n2TLpVN7669a79pDtp9BXua/+VprdNLH2AXUR6BzKYQLZFCqOGFJCHHukI0J1VGtO\n7fh9qBepB/5Au+0AZuP3dUI=\n-----END PRIVATE KEY-----\n",
    client_email: "onsever@byob-370302.iam.gserviceaccount.com",
    client_id: "106878103525944600304",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/onsever%40byob-370302.iam.gserviceaccount.com",
  })
);

const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};

const client = new vision.ImageAnnotatorClient(CONFIG);

const authService = (() => {
  const login = (username, password) => {
    return new Promise(async (resolve, reject) => {
      console.log(username, password);
      await adminModel.find().then((result) => {
        console.log(result);
      });
      const user = await adminModel.findOne({
        username: username.toLowerCase(),
      });
      console.log(user.toJSON());
      if (!user) {
        reject("User not Found.");
      } else {
        if (user.password === password) {
          const token = tokenHelper.createToken(user, true);
          let u = user.toJSON();
          delete u.password;
          resolve({ token, ...u });
        } else reject("Incorrect password.");
      }
    });
  };

  const userLogin = (email, password, isGoogleSignIn) => {
    return new Promise(async (resolve, reject) => {
      if (email && password) {
        const user = await User.findOne({ email: email.toLowerCase() }).exec();
        if (!user) {
          reject("User not Found.");
        } else {
          if (
            isGoogleSignIn
              ? user.password === password
              : await bcrypt.compare(password, user.password)
          ) {
            const token = tokenHelper.createToken(user, false);
            resolve({
              token,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.email,
              dob: user.dob,
            });
          } else reject("Incorrect password.");
        }
      } else {
        reject("Email and password required.");
      }
    });
  };

  const userRegister = (credentials) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (credentials.isGoogleSignIn) {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            userLogin(credentials.email, credentials.id, true).then(
              (result) => {
                resolve(result);
              }
            );
          } else {
            const newUser = new User({
              firstName: credentials["given_name"],
              lastName: credentials["family_name"],
              email: credentials["email"],
              password: credentials["id"],
              dob: credentials["dob"],
            });

            await newUser.save();

            const token = tokenHelper.createToken(newUser, false);

            delete newUser.password;

            resolve({
              token,
              ...newUser.toJSON(),
            });
          }
          resolve(true);
        } else {
          if (
            credentials.firstName &&
            credentials.lastName &&
            credentials.email &&
            credentials.password
          ) {
            const user = await User.findOne({ email: credentials.email });
            if (user) {
              reject("User already exists.");
            } else {
              const newUser = new User(credentials);
              const salt = await bcrypt.genSalt(10);
              newUser.password = await bcrypt.hash(newUser.password, salt);
              const userInfo = await newUser.save();

              const token = tokenHelper.createToken(newUser, false);

              resolve({
                token,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                phone: userInfo.email,
                dob: userInfo.dob,
              });
            }
          } else {
            let error = "";
            switch (true) {
              case !credentials.firstName:
                error = "firstName";
                break;
              case !credentials.lastName:
                error = "lastName";
                break;
              case !credentials.email:
                error = "email";
                break;
              case !credentials.password:
                error = "password";
                break;
            }
            reject(error + " is required.");
          }
        }
      } catch (error) {
        console.log("Error in Resgister", error);
      }
    });
  };

  const idScan = async (imagePath) => {
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;
    // Validation for eligibility, rexturn boolean isVerified or not.
    return detections;
  };

  return {
    login,
    userLogin,
    userRegister,
    idScan,
  };
})();

export default authService;
