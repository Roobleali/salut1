
import { Router } from 'express';
import { odooService } from '../services/odooService';

const router = Router();

router.post('/onboard', async (req, res) => {
  try {
    const { company, email, industry } = req.body;

    // Create customer database
    const dbName = await odooService.createCustomerDatabase(company, email);

    // Setup trial subscription
    await odooService.setupTrialSubscription(dbName);

    // Return database credentials
    res.json({
      dbName,
      credentials: {
        url: process.env.ODOO_URL || 'http://localhost:8069',
        database: dbName,
        username: email,
      }
    });
  } catch (error) {
    console.error('Onboarding failed:', error);
    res.status(500).json({ error: 'Failed to setup customer environment' });
  }
});

export default router;
