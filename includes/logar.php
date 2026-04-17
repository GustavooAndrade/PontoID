<?php
session_start();
include("conexao.php");

$email = $_POST['email'];
$senha = $_POST['senha'];

// Busca na tbUsuarios dentro do novo banco
$sql = "SELECT * FROM tbUsuarios WHERE login = '$email'";
$result = mysqli_query($conn, $sql);
$usuario = mysqli_fetch_assoc($result);

if ($usuario && password_verify($senha, $usuario['senha'])) {
    // Salva os dados na sessão
    $_SESSION['usuario_id'] = $usuario['usuario_id'];
    $_SESSION['nome'] = $usuario['nome'];
    
    // Redireciona para o dashboard
    header("Location: ../pages/dashboard.html"); 
    exit;
} else {
    echo "<script>alert('E-mail ou senha incorretos!'); window.location.href='../pages/login.html';</script>";
}
?>