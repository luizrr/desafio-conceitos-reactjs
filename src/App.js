import React, {useState, useEffect} from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Desafio - Conceitos ReactJS "+ Date.now(),
      url: "https://github.com/luizrr/desafio-conceitos-reactjs",
      techs: ['ReactJS', 'Node.js', 'Webpacks', 'Babel']
    });

    const project = response.data;
    setRepositories([...repositories, project]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (e) {
      alert("Erro ao deletar repositório, tente novamente.");
    }
  }

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
