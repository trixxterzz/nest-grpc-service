// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var post_pb = require('./post_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_post_MultiCreateResult(arg) {
  if (!(arg instanceof post_pb.MultiCreateResult)) {
    throw new Error('Expected argument of type post.MultiCreateResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_post_MultiCreateResult(buffer_arg) {
  return post_pb.MultiCreateResult.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_post_Post(arg) {
  if (!(arg instanceof post_pb.Post)) {
    throw new Error('Expected argument of type post.Post');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_post_Post(buffer_arg) {
  return post_pb.Post.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_post_PostById(arg) {
  if (!(arg instanceof post_pb.PostById)) {
    throw new Error('Expected argument of type post.PostById');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_post_PostById(buffer_arg) {
  return post_pb.PostById.deserializeBinary(new Uint8Array(buffer_arg));
}


var PostServiceService = exports.PostServiceService = {
  getAllPosts: {
    path: '/post.PostService/GetAllPosts',
    requestStream: false,
    responseStream: true,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: post_pb.Post,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_post_Post,
    responseDeserialize: deserialize_post_Post,
  },
  getPostById: {
    path: '/post.PostService/GetPostById',
    requestStream: false,
    responseStream: false,
    requestType: post_pb.PostById,
    responseType: post_pb.Post,
    requestSerialize: serialize_post_PostById,
    requestDeserialize: deserialize_post_PostById,
    responseSerialize: serialize_post_Post,
    responseDeserialize: deserialize_post_Post,
  },
  getMultiplePosts: {
    path: '/post.PostService/GetMultiplePosts',
    requestStream: true,
    responseStream: true,
    requestType: post_pb.PostById,
    responseType: post_pb.Post,
    requestSerialize: serialize_post_PostById,
    requestDeserialize: deserialize_post_PostById,
    responseSerialize: serialize_post_Post,
    responseDeserialize: deserialize_post_Post,
  },
  createPost: {
    path: '/post.PostService/CreatePost',
    requestStream: false,
    responseStream: false,
    requestType: post_pb.Post,
    responseType: post_pb.PostById,
    requestSerialize: serialize_post_Post,
    requestDeserialize: deserialize_post_Post,
    responseSerialize: serialize_post_PostById,
    responseDeserialize: deserialize_post_PostById,
  },
  createMultiplePosts: {
    path: '/post.PostService/CreateMultiplePosts',
    requestStream: true,
    responseStream: false,
    requestType: post_pb.Post,
    responseType: post_pb.MultiCreateResult,
    requestSerialize: serialize_post_Post,
    requestDeserialize: deserialize_post_Post,
    responseSerialize: serialize_post_MultiCreateResult,
    responseDeserialize: deserialize_post_MultiCreateResult,
  },
  updatePost: {
    path: '/post.PostService/UpdatePost',
    requestStream: false,
    responseStream: false,
    requestType: post_pb.Post,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_post_Post,
    requestDeserialize: deserialize_post_Post,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  deletePost: {
    path: '/post.PostService/DeletePost',
    requestStream: false,
    responseStream: false,
    requestType: post_pb.PostById,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_post_PostById,
    requestDeserialize: deserialize_post_PostById,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.PostServiceClient = grpc.makeGenericClientConstructor(PostServiceService);
