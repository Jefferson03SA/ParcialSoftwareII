import { Router } from 'express';
import {
    createService,
    getActiveDueServices,
    getOverdueUnpaidServices,
    getPaidServices
    // getServiceById,
    // updateService,
    // markServiceAsPaid
} from '../controllers/service.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

// Crear un nuevo servicio
router.post('/service', authRequired, createService);

// Obtener servicios activos con fecha de vencimiento futura
router.get('/service/active', authRequired, getActiveDueServices);

// Obtener servicios vencidos y no pagados
router.get('/service/overdue', authRequired, getOverdueUnpaidServices);

// Obtener servicios pagados
router.get('/service/paid', authRequired, getPaidServices);







// Obtener un servicio por su ID
// router.get('/:id', authRequired, getServiceById);

// // Actualizar un servicio
// router.put('/:id', authRequired, updateService);

// // Marcar un servicio como pagado
// router.patch('/:id/paid', authRequired, markServiceAsPaid);

export default router;