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
  renga?: Maybe<Renga>;
};


export type QueryUsersArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryRengaArgs = {
  where: RengaWhereUniqueInput;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type RengaWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Renga = {
   __typename?: 'Renga';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  author: User;
  movie: Movie;
  submissions: Array<Submission>;
  emojis: Array<Scalars['String']>;
  isResolved: Scalars['Boolean'];
};


export type RengaSubmissionsArgs = {
  where?: Maybe<RengaSubmissionsWhereInput>;
  orderBy?: Maybe<RengaSubmissionsOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<SubmissionWhereUniqueInput>;
  before?: Maybe<SubmissionWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type Movie = {
   __typename?: 'Movie';
  movieDBId: Scalars['Int'];
  maybeTitle: Scalars['String'];
};

export type RengaSubmissionsWhereInput = {
  authorId?: Maybe<IntFilter>;
  valid?: Maybe<BooleanFilter>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
};

export type BooleanFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<Scalars['Boolean']>;
};

export type RengaSubmissionsOrderByInput = {
  createdAt?: Maybe<OrderByArg>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type SubmissionWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Submission = {
   __typename?: 'Submission';
  id: Scalars['Int'];
  valid: Scalars['Boolean'];
  author: User;
  createdAt: Scalars['DateTime'];
  maybeTitle: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createOneUser: User;
  createOneRenga: Renga;
  createSubmission: Submission;
  createParty: Scalars['String'];
};


export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateOneRengaArgs = {
  data: RengaCreateInput;
};


export type MutationCreateSubmissionArgs = {
  rengaId: Scalars['Int'];
  movieDBId: Scalars['Int'];
  movieTitle: Scalars['String'];
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
  submissions?: Maybe<SubmissionCreateManyWithoutRengaInput>;
  movie: MovieCreateOneWithoutRengasInput;
  author: UserCreateOneWithoutRengasInput;
};

export type RengaCreateemojisInput = {
  set?: Maybe<Array<Scalars['String']>>;
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
  movieDBId: Scalars['Int'];
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

export type RengaCreateManyWithoutAuthorInput = {
  create?: Maybe<Array<RengaCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<RengaWhereUniqueInput>>;
};

export type RengaCreateWithoutAuthorInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  emojis?: Maybe<RengaCreateemojisInput>;
  submissions?: Maybe<SubmissionCreateManyWithoutRengaInput>;
  movie: MovieCreateOneWithoutRengasInput;
  party: PartyCreateOneWithoutRengasInput;
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

export type SubmissionCreateManyWithoutAuthorInput = {
  create?: Maybe<Array<SubmissionCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<SubmissionWhereUniqueInput>>;
};

export type SubmissionCreateWithoutAuthorInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  valid?: Maybe<Scalars['Boolean']>;
  movieTitle: Scalars['String'];
  movieDBId: Scalars['Int'];
  renga: RengaCreateOneWithoutSubmissionsInput;
};

export type RengaCreateOneWithoutSubmissionsInput = {
  create?: Maybe<RengaCreateWithoutSubmissionsInput>;
  connect?: Maybe<RengaWhereUniqueInput>;
};

export type RengaCreateWithoutSubmissionsInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  emojis?: Maybe<RengaCreateemojisInput>;
  movie: MovieCreateOneWithoutRengasInput;
  author: UserCreateOneWithoutRengasInput;
  party: PartyCreateOneWithoutRengasInput;
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

export type PartyWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type RengaCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  emojis?: Maybe<RengaCreateemojisInput>;
  submissions?: Maybe<SubmissionCreateManyWithoutRengaInput>;
  movie: MovieCreateOneWithoutRengasInput;
  author: UserCreateOneWithoutRengasInput;
  party: PartyCreateOneWithoutRengasInput;
};

export type Party = {
   __typename?: 'Party';
  id: Scalars['String'];
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

export type GetRengaQueryVariables = {
  rengaId: Scalars['Int'];
};


export type GetRengaQuery = (
  { __typename?: 'Query' }
  & { renga?: Maybe<(
    { __typename?: 'Renga' }
    & Pick<Renga, 'id' | 'emojis' | 'createdAt' | 'isResolved'>
    & { movie: (
      { __typename?: 'Movie' }
      & Pick<Movie, 'maybeTitle' | 'movieDBId'>
    ), author: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), submissions: Array<(
      { __typename?: 'Submission' }
      & Pick<Submission, 'createdAt' | 'valid' | 'maybeTitle'>
      & { author: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  )> }
);

export type CreateSubmissionMutationVariables = {
  rengaId: Scalars['Int'];
  movieTitle: Scalars['String'];
  movieDBId: Scalars['Int'];
};


export type CreateSubmissionMutation = (
  { __typename?: 'Mutation' }
  & { createSubmission: (
    { __typename?: 'Submission' }
    & Pick<Submission, 'id' | 'valid'>
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
export type CreatePartyMutationHookResult = ReturnType<typeof useCreatePartyMutation>;
export type CreatePartyMutationResult = ApolloReactCommon.MutationResult<CreatePartyMutation>;
export type CreatePartyMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePartyMutation, CreatePartyMutationVariables>;
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
export const GetRengaDocument = gql`
    query getRenga($rengaId: Int!) {
  renga(where: {id: $rengaId}) {
    id
    emojis
    createdAt
    isResolved
    movie {
      maybeTitle
      movieDBId
    }
    author {
      username
    }
    submissions(orderBy: {createdAt: desc}, first: 10) {
      author {
        id
        username
      }
      createdAt
      valid
      maybeTitle
    }
  }
}
    `;

/**
 * __useGetRengaQuery__
 *
 * To run a query within a React component, call `useGetRengaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRengaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRengaQuery({
 *   variables: {
 *      rengaId: // value for 'rengaId'
 *   },
 * });
 */
export function useGetRengaQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRengaQuery, GetRengaQueryVariables>) {
        return ApolloReactHooks.useQuery<GetRengaQuery, GetRengaQueryVariables>(GetRengaDocument, baseOptions);
      }
export function useGetRengaLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRengaQuery, GetRengaQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetRengaQuery, GetRengaQueryVariables>(GetRengaDocument, baseOptions);
        }
export type GetRengaQueryHookResult = ReturnType<typeof useGetRengaQuery>;
export type GetRengaLazyQueryHookResult = ReturnType<typeof useGetRengaLazyQuery>;
export type GetRengaQueryResult = ApolloReactCommon.QueryResult<GetRengaQuery, GetRengaQueryVariables>;
export const CreateSubmissionDocument = gql`
    mutation createSubmission($rengaId: Int!, $movieTitle: String!, $movieDBId: Int!) {
  createSubmission(rengaId: $rengaId, movieDBId: $movieDBId, movieTitle: $movieTitle) {
    id
    valid
  }
}
    `;

/**
 * __useCreateSubmissionMutation__
 *
 * To run a mutation, you first call `useCreateSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubmissionMutation, { data, loading, error }] = useCreateSubmissionMutation({
 *   variables: {
 *      rengaId: // value for 'rengaId'
 *      movieTitle: // value for 'movieTitle'
 *      movieDBId: // value for 'movieDBId'
 *   },
 * });
 */
export function useCreateSubmissionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSubmissionMutation, CreateSubmissionMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateSubmissionMutation, CreateSubmissionMutationVariables>(CreateSubmissionDocument, baseOptions);
      }
export type CreateSubmissionMutationHookResult = ReturnType<typeof useCreateSubmissionMutation>;
export type CreateSubmissionMutationResult = ApolloReactCommon.MutationResult<CreateSubmissionMutation>;
export type CreateSubmissionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSubmissionMutation, CreateSubmissionMutationVariables>;