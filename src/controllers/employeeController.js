const Funcionario = require('../models/Funcionario');
const Telefone = require('../models/Telefone');

// Cria um novo funcionário
exports.createEmployee = async (req, res) => {
  try {
    const { nome, cargo, foto, telefones } = req.body;

    // Crie o funcionário, incluindo os telefones no objeto de criação
    const novoFuncionario = await Funcionario.create({ nome, cargo, foto, telefones });

    res.status(201).json({ message: 'Funcionário adicionado com sucesso', employeeId: novoFuncionario.id });
  } catch (error) {
    console.error('Erro ao criar um funcionário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Obtém todos os funcionários
exports.getAllEmployees = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    res.json(funcionarios);
  } catch (error) {
    console.error('Erro ao listar os funcionários:', error);
    res.status(500).json({ error: 'Erro ao listar os funcionários' });
  }
};

// Obtém um funcionário por ID
exports.getEmployeeById = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const funcionario = await Funcionario.findByPk(employeeId);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json(funcionario);
  } catch (error) {
    console.error('Erro ao buscar o funcionário:', error);
    res.status(500).json({ error: 'Erro ao buscar o funcionário' });
  }
};

// Atualiza um funcionário por ID
exports.updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const { nome, cargo, foto, telefones } = req.body;

  try {
    const funcionario = await Funcionario.findByPk(employeeId);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    // Verifique quais campos estão presentes na solicitação e atualize apenas esses campos
    if (nome) {
      funcionario.nome = nome;
    }
    if (cargo) {
      funcionario.cargo = cargo;
    }
    if (foto) {
      funcionario.foto = foto;
    }
    if (telefones) {
      funcionario.telefones = telefones; // Corrija para 'funcionario.telefones'
    }

    await funcionario.save();
    res.json({ message: 'Funcionário atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar o funcionário:', error);
    res.status(500).json({ error: 'Erro ao atualizar o funcionário' });
  }
};

// Exclui um funcionário por ID
exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const funcionario = await Funcionario.findByPk(employeeId);

    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    await funcionario.destroy();

    res.json({ message: 'Funcionário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o funcionário:', error);
    res.status(500).json({ error: 'Erro ao excluir o funcionário' });
  }
};
