react-native:

Install following dependencies:

npm install @react-native-async-storage/async-storage

npm install @react-navigation/native

npm i axios expo-image-picker

npm i react-native-gesture-handler

add this in app.json:

 "plugins": [
      [
      
        "expo-image-picker",
        
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ]
    ]

backend:

create .env file with these settings:


MONGO_URI = "mongodb://127.0.0.1:27017/profiles-db-a"
PORT = 4444
JWT_SECRET = xxxxxxxxxx


cloudinary settings in authController:

// Configure Cloudinary

cloudinary.config({

    cloud_name: ‘xxx’,
    
    api_key: ‘xxxx,
    
    api_secret: ‘xxx’x,
    
  });
