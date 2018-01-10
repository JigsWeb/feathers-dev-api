Mutation

```
mutation { addUser(input: { $email, $firstName, $lastName }) { id, email }}
mutation { addArticle(input: { $_user, $title, $text }) { id, title }}
```

Query

```
query { user($id) { id, email, firstName }} 
query { users { id, email, firstName }} 
query { article($id) { id, author, title, text }} 
query { articles { author, title }} 
```

_user étant l'id string d'un user, #obvious

Roadmap:

    - Commencer à regarder coté clients
        - https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b (Pas mal, a la fin sa parle des subscriptions)
        - https://dev-blog.apollodata.com/the-future-of-state-management-dd410864cae2 (Remplacé redux qui deviens assez tricky)
    - Implémenter l'authentification
    - Finir d'implétenter les mutations basique, update et delete.
    - Revoir l'architecture des modules, bien séparé les rootModules(Query, Mutation, Subscription) au subModules (Article, User)
    - J'ai tenté de reprendre l'architecture duck <3
    - Impléter dataloader, pour l'instant les requêtes sont pas compliqués mais bon..
    - Implémenter un systeme de caching (redis ?)
    - Fuck la redondance


Questions

    - Faut-il vraiment utiliser Apollo sachant que le plugin feathers est useless voir limitant (vraiment)
        - https://github.com/chentsulin/awesome-graphql#lib-js (Les libs qui tournent autour de GraphQL)
        - https://facebook.github.io/relay/docs/en/new-in-relay-modern.html (Relay / Apollo that the question)
        - Si on regarde la doc d'apollo, j'ai l'impression que c'est surtout utile aux personnes qui font de la supervision
            - Seulement une methode qui permet de d'executer un schema stringifié
    - Faudrait trouver un moyen de ne pas exposer l'api
    - Je suis fatigué salut

Si tu as des idées, balance