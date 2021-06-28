<h1> Video-Streaming </h1>
<h4>Sistema de exemplo de um streaming, com arquitetura de microservices usando Node.js</h4>
  <label>Lista de tecnologias</label>
  <ul>
    <li>Node</li>
    <li>PostgreSQL</li>
    <li>Docker</li> 
  </ul>
  <label>Documentação das rotas</label>
  <ul>
    <li>/videos/delete/{id} --> apaga determinado video</li>
    <li>/videos/watch/{id} -->retorna o video em forma de stream</li>
    <li>/upload --> envia um form em multipart/form-data com o video</li>
    <li>/videos/upload --> registra no banco de dados </li>
    <li>/videos/delete{id} --> deleta video no banco de dados</li>
    <li>/videos --> retorna todos os videos no banco de dados</li>
    <li>/videos/check/{id} --> verifica se existe no banco de dados</li>
    <li>/videos/details/{id} --> retorna os detalhes do video</li>
    
  
  </ul>
  
