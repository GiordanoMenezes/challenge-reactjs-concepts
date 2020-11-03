import React, { useState } from "react";
import { useEffect } from "react";
import api from "./services/api";

import { v4 as uuidv4 } from 'uuid';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      id: uuidv4(),
      title: 'Desafio ReactJS',
      url: 'www/meurepositório.com',
      "techs": ["ReactJS", "MySQL", "NodeJS"]
    });
    console.log(response);
    if (response.status === 200) {
      setRepositories([
        ...repositories,
        response.data
      ]);
    }
  }

  async function handleRemoveRepository(id) {


    const response = await api.delete(`/repositories/${id}`);
    if (response.status === 204) {
      setRepositories(repositories.filter(rep => {
        return rep.id !== id;
      }));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
           </button>
          </li>
        })}

      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
