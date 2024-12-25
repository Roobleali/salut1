
import { Router } from 'express';
import { odooService } from '../services/odooService';

const router = Router();

router.post('/onboard', async (req, res) => {
  try {
    const { company, email, industry, plan = 'starter' } = req.body;

    if (!company || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Company name and email are required'
      });
    }

    // Create customer database with subscription
    const result = await odooService.createCustomerDatabase(company, email, plan);

    // Return database credentials and subscription info
    res.json({
      success: true,
      ...result,
      subscription: {
        plan,
        trialDays: 14,
        modules: odooService.getModulesForPlan(plan)
      }
    });
  } catch (error) {
    console.error('Onboarding failed:', error);
    res.status(500).json({ 
      error: 'Failed to setup customer environment',
      details: error.message
    });
  }
});

export default router;
