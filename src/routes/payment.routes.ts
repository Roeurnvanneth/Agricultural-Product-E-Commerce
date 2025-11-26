import { Router } from 'express';
import * as ctrl from '../controllers/payment.controller';

const router = Router();

router.post('/', ctrl.createPaymentHandler);          // create payment
router.get('/', ctrl.listPaymentsHandler);            // list payments (query params allowed)
router.get('/:id', ctrl.getPaymentHandler);           // get by id
router.put('/:id/status', ctrl.updateStatusHandler);  // update status

export default router;
