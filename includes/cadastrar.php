<?php
include("conexao.php");

// Recebendo dados do formulário
$nome        = $_POST['nome'];
$cpf         = $_POST['cpf'];
$nascimento  = $_POST['nascimento'];
$telefone    = $_POST['telefone'];
$email       = $_POST['email']; 
$senha1      = $_POST['senha1'];
$senha2      = $_POST['senha2'];

if ($senha1 !== $senha2) {
    die("As senhas não conferem!");
}

$senha_hash = password_hash($senha1, PASSWORD_DEFAULT);

// 1. Inserir na tbUsuarios
// O campo atualizado_por fica NULL no primeiro cadastro (auto-relacionamento)
$sql_user = "INSERT INTO tbUsuarios (nome, login, senha) VALUES ('$nome', '$email', '$senha_hash')";

if (mysqli_query($conn, $sql_user)) {
    // 2. Pegar o ID que o banco acabou de gerar para este usuário
    $id_usuario_gerado = mysqli_insert_id($conn);

    // 3. Inserir na tbPessoas vinculando ao usuário (FK atualizado_por também como NULL aqui)
    // Nota: Defini pessoa_tipo_id como 1 (ajuste conforme sua tabela tbPessoaTipo)
    $sql_pessoa = "INSERT INTO tbPessoas (nome, cpf, nascimento, telefone, atualizado_por) 
                   VALUES ('$nome', '$cpf', '$nascimento', '$telefone', NULL)";

    if (mysqli_query($conn, $sql_pessoa)) {
        echo "<script>alert('Cadastro realizado com sucesso!'); window.location.href='../pages/login.html';</script>";
    } else {
        echo "Erro ao salvar dados pessoais: " . mysqli_error($conn);
    }
} else {
    echo "Erro ao criar conta de usuário: " . mysqli_error($conn);
}
?>