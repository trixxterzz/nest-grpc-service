const grpc = require('@grpc/grpc-js');
const { PostServiceClient } = require('./post/proto/post_grpc_pb');
const { Post, PostById } = require('./post/proto/post_pb');
const { Empty } = require('google-protobuf/google/protobuf/empty_pb');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getAllPosts(client){
    const req = new Empty();
    const call = client.getAllPosts(req);
    
    call.on('data', (res) => {
        console.log('Received data');
        console.log(res.getId());
        console.log(res.getTitle());
        console.log(res.getContent());
        console.log('\n');
    });
}

function createPost(client){
    const req = new Post().setTitle('Test 3').setContent('Test 3');

    client.createPost(req, (err, res) => {
        if (err) {
            return console.log(err);
        }

        console.log(res.getId());
    });
}

function getPostById(client) {
    const req = new PostById().setId(25);

    client.getPostById(req, (err, res) => {
        if (err) {
            return console.log(err);
        }

        console.log('Received data');
        console.log(res.getId());
        console.log(res.getTitle());
        console.log(res.getContent());
        console.log('\n');
    });
}

async function createMultiplePosts(client) {
    const posts = [{
        title: 'Test 7',
        content: 'Test 7'
    }, {
        title: 'Test 8',
        content: 'Test 8'
    }, {
        title: 'Test 9',
        content: 'Test 9'
    }];

    const call = client.createMultiplePosts((err, res) => {
        if (err) {
            return console.log(err);
        }

        console.log(res['u']);
    });

    posts.forEach(({ title, content }) => {
        const req = new Post().setTitle(title).setContent(content);

        call.write(req);
    });

    await sleep(3000);
    call.end();
}

async function getMultiplePosts(client) {
    const ids = [{id: 11}, {id: 12}, {id: 13}, {id: 14}];

    const call = client.getMultiplePosts();

    call.on('data', (res) => console.log(res.getTitle()));

    for (let i of ids) {
        const req = new PostById().setId(i.id);
        call.write(req);
        await sleep(1000);
    }

    call.end();
}

function updatePost(client) {
    const req = new Post().setId(25).setTitle('Test 25').setContent('Test 25');

    client.updatePost(req, (res, err) => {
        if (err) {
            return console.log(err);
        }
    });
}

function deletePost(client) {
    const req = new PostById().setId(25);

    client.deletePost(req, (res, err) => {
        if (err) {
            return console.log(err);
        }
    });
}

function main() {
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new PostServiceClient('localhost:5000', creds);

    // createPost(client);
    // getAllPosts(client);
    // getPostById(client);
    // createMultiplePosts(client);
    getMultiplePosts(client);
    // updatePost(client);
    // deletePost(client);
}

main();