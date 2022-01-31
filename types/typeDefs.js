const {gql} = require('apollo-server');


module.exports = gql`
    input RegisterInput{
        user: String!,
        email:String!,
        password: String!,
        confirmPassword: String!
    },
    input FeatureInput{
        name: String
    },
    input TagsInput {
        tag_name: String
    } ,
    input CompatibilityInput{
        compat_name: String
    },
    type Comment{
        id: ID!,
        user_id: String!,
        body: String!,
        likes: String!,
        product_id: String!,
        createdAt: String!
        user: User
    },
    type User{
        id: ID!
        user: String!,
        email: String!,
        token: String!,
        image: String,
        createdAt: String!
    },
    type Actions{
        actionType: String,
        comment_id: String, 
        body: String,
        product_id: String
    },
    type UserActions{
        user_id: String!,
        action: Actions!,
        createdAt: String!,
        user: User,
    },
    type Feature {
        name: String
    },
    type Tags {
        tag_name: String
    },
    type Compatibility{
        name: String
    }
    type Product{
        id: ID!,
        title: String!,
        category: String,
        description: String,
        status: String!,
        price: String!,
        createdAt: String!,
        product_owner: String,
        minimum_amount: String,
        suggested_amount: String,
        cover_image: String,
        visibility: String!,
        features: [Feature],
        tags:[Tags],
        compatibility:[Compatibility],
        comments: [Comment]!
    },
    type Query{ 
        getUsers: [User]!
        getUser(user: String): User!
        getProducts: [Product]!
        getComments: [Comment]!
        getRecentActions: [UserActions]!
    },
    type Mutation{
        registerUser(registerInput: RegisterInput) : User!
        login(username: String , password: String) : User!
        postComment(body: String , productID: String): Comment!
        addProduct(title: String , price: String ,  status: String , category: String, description: String , minimum_amount: String , suggested_amount: String, visibility: String , cover_image: String ,  features: [FeatureInput] , tags: [TagsInput] , compatibility: [CompatibilityInput] ) : Product
        reply(body: String , commentID: String) : Comment!
        productActions(action: String , productID: String) : Product!
        like(commentID: String , productID: String ) : UserActions!
    }
`