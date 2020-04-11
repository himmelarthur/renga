import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Query = {
   __typename?: 'Query';
  users: Array<User>;
};


export type QueryUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createOneUser: User;
<<<<<<< HEAD
  createParty: Scalars['String'];
=======
  createOneRenga: Renga;
>>>>>>> Add crud resolver for renga creation
};


export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};


export type MutationCreatePartyArgs = {
  username: Scalars['String'];
};

export type UserCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
  score?: Maybe<Scalars['Int']>;
  party: PartyCreateOneWithoutUsersInput;
  rengas?: Maybe<RengaCreateManyWithoutAuthorInput>;
  submission?: Maybe<SubmissionCreateManyWithoutAuthorInput>;
};


export type PartyCreateOneWithoutUsersInput = {
  create?: Maybe<PartyCreateWithoutUsersInput>;
  connect?: Maybe<PartyWhereUniqueInput>;
};

export type PartyCreateWithoutUsersInput = {
  id: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  rengas?: Maybe<RengaCreateManyWithoutPartyInput>;
};

export type RengaCreateManyWithoutPartyInput = {
  create?: Maybe<Array<RengaCreateWithoutPartyInput>>;
  connect?: Maybe<Array<RengaWhereUniqueInput>>;
};

export type RengaCreateWithoutPartyInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  emojis?: Maybe<RengaCreateemojisInput>;
  movie: MovieCreateOneWithoutRengasInput;
  author: UserCreateOneWithoutRengasInput;
  submission?: Maybe<SubmissionCreateManyWithoutRengaInput>;
};

export type RengaCreateemojisInput = {
  set?: Maybe<Array<Scalars['String']>>;
};

export type MovieCreateOneWithoutRengasInput = {
  create?: Maybe<MovieCreateWithoutRengasInput>;
  connect?: Maybe<MovieWhereUniqueInput>;
};

export type MovieCreateWithoutRengasInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  movieDBId: Scalars['Int'];
  title: Scalars['String'];
  year: Scalars['Int'];
  genres?: Maybe<MovieCreategenresInput>;
};

export type MovieCreategenresInput = {
  set?: Maybe<Array<Scalars['String']>>;
};

export type MovieWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  movieDBId?: Maybe<Scalars['Int']>;
};

export type UserCreateOneWithoutRengasInput = {
  create?: Maybe<UserCreateWithoutRengasInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserCreateWithoutRengasInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
  score?: Maybe<Scalars['Int']>;
  party: PartyCreateOneWithoutUsersInput;
  submission?: Maybe<SubmissionCreateManyWithoutAuthorInput>;
};

export type SubmissionCreateManyWithoutAuthorInput = {
  create?: Maybe<Array<SubmissionCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<SubmissionWhereUniqueInput>>;
};

export type SubmissionCreateWithoutAuthorInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  valid?: Maybe<Scalars['Boolean']>;
  movieTitle: Scalars['String'];
<<<<<<< HEAD
=======
  movieDBId: Scalars['Int'];
>>>>>>> Add crud resolver for renga creation
  renga: RengaCreateOneWithoutSubmissionInput;
};

export type RengaCreateOneWithoutSubmissionInput = {
  create?: Maybe<RengaCreateWithoutSubmissionInput>;
  connect?: Maybe<RengaWhereUniqueInput>;
};

export type RengaCreateWithoutSubmissionInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  emojis?: Maybe<RengaCreateemojisInput>;
  movie: MovieCreateOneWithoutRengasInput;
  author: UserCreateOneWithoutRengasInput;
  party: PartyCreateOneWithoutRengasInput;
};

export type PartyCreateOneWithoutRengasInput = {
  create?: Maybe<PartyCreateWithoutRengasInput>;
  connect?: Maybe<PartyWhereUniqueInput>;
};

export type PartyCreateWithoutRengasInput = {
  id: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UserCreateManyWithoutPartyInput>;
};

export type UserCreateManyWithoutPartyInput = {
  create?: Maybe<Array<UserCreateWithoutPartyInput>>;
  connect?: Maybe<Array<UserWhereUniqueInput>>;
};

export type UserCreateWithoutPartyInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
  score?: Maybe<Scalars['Int']>;
  rengas?: Maybe<RengaCreateManyWithoutAuthorInput>;
  submission?: Maybe<SubmissionCreateManyWithoutAuthorInput>;
};

export type RengaCreateManyWithoutAuthorInput = {
  create?: Maybe<Array<RengaCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<RengaWhereUniqueInput>>;
};

export type RengaCreateWithoutAuthorInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  emojis?: Maybe<RengaCreateemojisInput>;
  movie: MovieCreateOneWithoutRengasInput;
  party: PartyCreateOneWithoutRengasInput;
  submission?: Maybe<SubmissionCreateManyWithoutRengaInput>;
};

export type SubmissionCreateManyWithoutRengaInput = {
  create?: Maybe<Array<SubmissionCreateWithoutRengaInput>>;
  connect?: Maybe<Array<SubmissionWhereUniqueInput>>;
};

export type SubmissionCreateWithoutRengaInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  valid?: Maybe<Scalars['Boolean']>;
  movieTitle: Scalars['String'];
<<<<<<< HEAD
=======
  movieDBId: Scalars['Int'];
>>>>>>> Add crud resolver for renga creation
  author: UserCreateOneWithoutSubmissionInput;
};

export type UserCreateOneWithoutSubmissionInput = {
  create?: Maybe<UserCreateWithoutSubmissionInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserCreateWithoutSubmissionInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
  score?: Maybe<Scalars['Int']>;
  party: PartyCreateOneWithoutUsersInput;
  rengas?: Maybe<RengaCreateManyWithoutAuthorInput>;
};

export type SubmissionWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type RengaWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type PartyWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

<<<<<<< HEAD
export type Party = {
   __typename?: 'Party';
  id: Scalars['String'];
=======
export type RengaCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  emojis?: Maybe<RengaCreateemojisInput>;
  movie: MovieCreateOneWithoutRengasInput;
  author: UserCreateOneWithoutRengasInput;
  party: PartyCreateOneWithoutRengasInput;
  submission?: Maybe<SubmissionCreateManyWithoutRengaInput>;
};

export type Renga = {
   __typename?: 'Renga';
  id: Scalars['Int'];
  emojis: Array<Scalars['String']>;
>>>>>>> Add crud resolver for renga creation
};

export type CreatePartyMutationVariables = {
  username: Scalars['String'];
};


export type CreatePartyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createParty'>
);

export type CreateRengaMutationVariables = {
  authorId: Scalars['Int'];
  partyId: Scalars['String'];
  emojis: Array<Scalars['String']>;
  movieId: Scalars['Int'];
  movieTitle: Scalars['String'];
  movieYear: Scalars['Int'];
};


export type CreateRengaMutation = (
  { __typename?: 'Mutation' }
  & { createOneRenga: (
    { __typename?: 'Renga' }
    & Pick<Renga, 'id' | 'emojis'>
  ) }
);


export const CreatePartyDocument = gql`
    mutation CreateParty($username: String!) {
  createParty(username: $username)
}
    `;

/**
 * __useCreatePartyMutation__
 *
 * To run a mutation, you first call `useCreatePartyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePartyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPartyMutation, { data, loading, error }] = useCreatePartyMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreatePartyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePartyMutation, CreatePartyMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePartyMutation, CreatePartyMutationVariables>(CreatePartyDocument, baseOptions);
      }
<<<<<<< HEAD
export type CreatePartyMutationHookResult = ReturnType<typeof useCreatePartyMutation>;
export type CreatePartyMutationResult = ApolloReactCommon.MutationResult<CreatePartyMutation>;
export type CreatePartyMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePartyMutation, CreatePartyMutationVariables>;
=======
export function useAllUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, baseOptions);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = ApolloReactCommon.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const CreateRengaDocument = gql`
    mutation createRenga($authorId: Int!, $partyId: String!, $emojis: [String!]!, $movieId: Int!, $movieTitle: String!, $movieYear: Int!) {
  createOneRenga(data: {emojis: {set: $emojis}, author: {connect: {id: $authorId}}, party: {connect: {id: $partyId}}, movie: {create: {movieDBId: $movieId, title: $movieTitle, year: $movieYear}}}) {
    id
    emojis
  }
}
    `;

/**
 * __useCreateRengaMutation__
 *
 * To run a mutation, you first call `useCreateRengaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRengaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRengaMutation, { data, loading, error }] = useCreateRengaMutation({
 *   variables: {
 *      authorId: // value for 'authorId'
 *      partyId: // value for 'partyId'
 *      emojis: // value for 'emojis'
 *      movieId: // value for 'movieId'
 *      movieTitle: // value for 'movieTitle'
 *      movieYear: // value for 'movieYear'
 *   },
 * });
 */
export function useCreateRengaMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRengaMutation, CreateRengaMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateRengaMutation, CreateRengaMutationVariables>(CreateRengaDocument, baseOptions);
      }
export type CreateRengaMutationHookResult = ReturnType<typeof useCreateRengaMutation>;
export type CreateRengaMutationResult = ApolloReactCommon.MutationResult<CreateRengaMutation>;
export type CreateRengaMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRengaMutation, CreateRengaMutationVariables>;
>>>>>>> Add crud resolver for renga creation
