# App Setup

To set up this app, follow the steps below:

1. Clone the repository to your local machine:
    ```
    git clone https://github.com/xarcode/Blog-API.git
    ```

2. Navigate to the project directory:
    ```
    cd /d:/projects and code/web dev/Version Task 1
    ```

3. Install the required dependencies:
    ```
    npm install
    ```

4. Start the server:
    ```
    node index.js
    ```


## Routes

The app provides the following routes:

### CREATE

- **localhost:3000/register** - Creates a new author. Data is sent in the format `{"name": "nikhil", "email": "nikhil@gmail.com"}`
- **localhost:3000/compose** - Creates a new post. Data is sent in the format `{"title": "new post 2","content": "new post 2 content"}` along with the header `author_id:id` to know who is the author of the blog post

### GET

- **localhost:3000/posts** - gets all the available posts from the database
- **localhost:3000/authors** - gets all the available authors from the database
- **localhost:3000/posts/:id** - gets the post with the corresponding id
- **localhost:3000/authors/all/:id** - gets all the posts created by a particular author

### UPDATE

- **localhost:3000/posts/:id** - updates the post with the corresponding id. Takes data in the format `{"title": "updated title","content": "updated content"}`. Also takes the header `author_id` to authenticate the patch request
- **localhost:3000/authors/:id** - updates the name of the author. Takes data in the format `{"message": "author updated successfully"}`

### DELETE

- **localhost:3000/posts/:id** - deletes the post with the given id. Also requires the header `author_id` to authenticate the delete request
- **localhost:3000/authors/:id** - deletes the author with the given id.