// import { Client, Databases, Query } from 'node-appwrite';
// const client = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '');

// const databases = new Databases(client);
// const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
// const USER_COLLECTION_ID =
//   process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || '';
// export async function getUser(email: string) {
//   const promise = databases.listDocuments(DATABASE_ID, USER_COLLECTION_ID, [
//     Query.equal('email', email),
//   ]);
//   const result = await promise;
//   return result;
// }
