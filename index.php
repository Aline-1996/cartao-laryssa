<?php
$phrases = [
    "Você é o meu lugar favorito no mundo. Amo cada detalhe seu.",
    "Quando você está por perto, tudo fica mais bonito. Seu jeito me encanta.",
    "Meu lugar favorito no mundo será sempre aquele que estiver ao seu lado, especialmente no nosso cantinho que vamos construir."
];

$uploadDir = __DIR__ . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR;
$imageFile = 'lary.jpg'; // <-- IMAGEM CORRETA
$imagePath = 'images/' . $imageFile;

// Handle AJAX upload
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['photo'])) {
    $result = ['success' => false];
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    $tmp = $_FILES['photo']['tmp_name'];
    $name = $imageFile; 
    $target = $uploadDir . $name;
    if (move_uploaded_file($tmp, $target)) {
        $result['success'] = true;
        $result['path'] = $imagePath;
    } else {
        $result['error'] = 'Falha ao salvar o arquivo.';
    }
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
    exit;
}

// If file exists, use it, else keep default
if (!file_exists($uploadDir . $imageFile)) {
    $imagePath = 'images/placeholder.png'; 
}

$whatsappNumber = '41991758894';
$whatsappLink = 'https://wa.me/55' . $whatsappNumber;
?>
<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Para Laryssa</title>
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css"> 
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="theme-rose">
  <div class="page">
    <div class="card" id="card">
      <div class="controls">
        <select id="fontSelect" class="btn">
          <option value="great-vibes">Great Vibes</option>
          <option value="playfair">Playfair Display</option>
          <option value="poppins">Poppins</option>
        </select>
        <button class="btn" id="themeToggle">Trocar tema</button>
        <button class="btn" id="uploadBtn">Enviar foto</button>
        <input type="file" id="photoInput" name="photo" accept="image/*" style="display:none">
        <button class="btn" id="printBtn">Baixar cartão (PDF)</button>
      </div>

      <div class="image-wrap">
        <img src="<?php echo htmlspecialchars($imagePath); ?>?t=<?php echo time(); ?>" alt="Laryssa" class="profile" id="profileImg">
      </div>
      
      <h1 id="title">Para Laryssa</h1>
      
      <div class="phrases">
        <?php foreach($phrases as $p): ?>
          <p class="phrase"><?php echo htmlspecialchars($p, ENT_QUOTES, 'UTF-8'); ?></p>
        <?php endforeach; ?>
      </div>
      
      <div class="footer-contact">
          <p class="signature">Ass: Aline</p>
          <a href="<?php echo $whatsappLink; ?>" target="_blank" class="whatsapp-btn">
              <i class="fab fa-whatsapp"></i> 
              41 99175-8894
          </a>
      </div>
      
    </div>
  </div>

  <script src="js/script.js" defer></script>
</body>
</html>