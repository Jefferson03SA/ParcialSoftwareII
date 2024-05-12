import Service from '../models/service.model.js';

// Crear un nuevo servicio

export const createService = async (req, res) => {
    console.log('Usuario autenticado:', req.user);
    try {
        const { name, amount, dueDate } = req.body;

        // console.log('Usuario autenticado:', req.user);
        const newService = new Service({
            name,
            amount,
            dueDate,
            paid: false, // Inicialmente el servicio no está pagado
            user: req.user.id, // Asignar el ID del usuario autenticado al servicio
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener servicios activos con fecha de vencimiento futura
export const getActiveDueServices = async (req, res) => {
    try {
        const activeDueServices = await Service.find({
            user: req.user.id,
            dueDate: { $gt: Date.now() },
            paid: false
        }).populate('user');
        res.json(activeDueServices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener servicios vencidos y no pagados
export const getOverdueUnpaidServices = async (req, res) => {
    try {
        const overdueUnpaidServices = await Service.find({
            user: req.user.id,
            dueDate: { $lt: Date.now() },
            paid: false
        });
        res.json(overdueUnpaidServices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener servicios pagados
export const getPaidServices = async (req, res) => {
    try {
        const paidServices = await Service.find({
            user: req.user.id,
            paid: true
        });
        res.json(paidServices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






// // Otros controladores: createService, getServiceById, updateService, markServiceAsPaid

// // Actualizar un servicio
// export const updateService = async (req, res) => {
//     // Lógica para actualizar un servicio
// }

// // Marcar un servicio como pagado
// export const markServiceAsPaid = async (req, res) => {
//     try {
//         const service = await Service.findByIdAndUpdate(
//             req.params.id,
//             { paid: true },
//             { new: true }
//         );

//         if (!service) {
//             return res.status(404).json({ message: 'Servicio no encontrado' });
//         }

//         res.json(service);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }