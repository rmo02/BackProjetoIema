const express = require("express");
const router = express.Router();
const multer = require("multer"); // Importe o módulo 'multer' aqui
const employeeController = require("../controllers/employeeController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // O diretório onde as imagens serão salvas
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nome do arquivo único
  },
});

const upload = multer({ storage: storage });

// Rotas para funcionários
router.post("/", upload.single("foto"), employeeController.createEmployee);
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", upload.single("foto"), employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
