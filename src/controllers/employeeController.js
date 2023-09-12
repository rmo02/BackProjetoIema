const Funcionario = require('../models/Funcionario');
const Telefone = require('../models/Telefone');

// Cria um novo funcionário
exports.createEmployee = async (req, res) => {
  try {
    const { nome, praca, cargo, telefones } = req.body;
    const foto = req.file.filename; // Obtém o nome do arquivo da imagem do objeto de upload

    // Crie o funcionário, incluindo os telefones no objeto de criação
    const novoFuncionario = await Funcionario.create({ nome, cargo, praca, foto,  telefones: JSON.parse(telefones),});

    res.status(201).json({ message: 'Funcionário adicionado com sucesso', employeeId: novoFuncionario.id });
  } catch (error) {
    console.error('Erro ao criar um funcionário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Obtém todos os funcionários
// Obtém todos os funcionários
exports.getAllEmployees = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll();
    // Adicione o URL da imagem a cada funcionário
    const funcionariosComImagens = funcionarios.map((funcionario) => {
      return {
        ...funcionario.toJSON(),
        foto: funcionario.foto
          ? `${req.protocol}://${req.get("host")}/uploads/${funcionario.foto}`
          : null,
      };
    });
    res.json(funcionariosComImagens);
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
    // Adicione o URL da imagem ao funcionário
    const funcionarioComImagem = {
      ...funcionario.toJSON(),
      foto: funcionario.foto
        ? `${req.protocol}://${req.get("host")}/uploads/${funcionario.foto}`
        : null,
    };
    res.json(funcionarioComImagem);
  } catch (error) {
    console.error('Erro ao buscar o funcionário:', error);
    res.status(500).json({ error: 'Erro ao buscar o funcionário' });
  }
};

// Atualiza um funcionário por ID
exports.updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const { nome, cargo, praca, telefones } = req.body;
  let foto = req.file ? req.file.filename : null; // Obtém o nome do novo arquivo de imagem, se fornecido

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
    if (praca) {
      funcionario.praca = praca;
    }
    if (foto) {
      funcionario.foto = foto;
    }
    if (telefones) {
      funcionario.telefones = JSON.parse(telefones);
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
