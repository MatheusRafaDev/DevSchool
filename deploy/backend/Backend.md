
# |Como publicar o Backend na Internet?

## Heroku


### No Github
- Criar outro repositório para guardar apenas o projeto da API
- O nome do Repositório pode ser **NomeDoProjeto.Heroku**

![Github](github-heroku.PNG)

### No VSCode
- Adicionar o repositório criado acima ao projeto
  - *CTRL + SHIFT + P*, depois Git Add Remote
  - Dê o nome do novo repositório de **Heroku**
- No Terminal, execute o comando:
  ```git subtree push --prefix **api** **heroku** master```

Isso irá subir o projeto **api** para o repositório **heroku**.

### Na Heroku
- Criar uma conta na Heroku
- Criar um projeto na Heroku
- Vincular o projeto ao Github criado anteriormente
- Publicar (Deploy)

![heroku](heroku1.png)
![heroku](heroku2.png)



### Próximas Atualizações

O processo acima deve ser feito apenas uma vez. Para publicar as novas alterações realizadas na API, somente é necessário atualizar o repositório da Heroku com o comando ```git subtree push --prefix **api** **heroku** master```.