const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Restaurant = require('./src/models/Restaurant');
const Table = require('./src/models/Table');
const AdminUser = require('./src/models/AdminUser');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await Restaurant.deleteMany({});
    await Table.deleteMany({});
    await AdminUser.deleteMany({});

    // 1. Create Admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const admin = await AdminUser.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'restaurant_admin',
    });

    console.log('Admin created: admin@example.com / password123');

    // 2. Create Restaurant
    const restaurant = await Restaurant.create({
      name: 'Tasty Bites',
      address: '123 Food Street',
      owner: admin._id,
      themeColor: '#ff6347',
    });

    // Link restaurant to admin
    admin.restaurant = restaurant._id;
    await admin.save();

    console.log('Restaurant created: Tasty Bites');

    // 3. Create Tables
    await Table.create([
      { restaurant: restaurant._id, number: '1' },
      { restaurant: restaurant._id, number: '2' },
      { restaurant: restaurant._id, number: '3' },
    ]);

    console.log('Tables created: 1, 2, 3');

    const output = `
-----------------------------------
SEEDING COMPLETE
-----------------------------------
Feedback URL: http://localhost:5173/feedback/${restaurant._id}/1
Admin Login: http://localhost:5173/admin/login
Admin Email: admin@example.com
Password: password123
-----------------------------------
    `;
    console.log(output);
    require('fs').writeFileSync('seed_output.txt', output);

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
