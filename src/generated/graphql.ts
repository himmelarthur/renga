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
  rengas: Array<Renga>;
  party?: Maybe<Party>;
  invitePartyLink: Scalars['String'];
  chatMessages: Array<ChatMessage>;
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


export type QueryRengasArgs = {
  where?: Maybe<RengaWhereInput>;
  orderBy?: Maybe<RengaOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<RengaWhereUniqueInput>;
  before?: Maybe<RengaWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryPartyArgs = {
  where: PartyWhereUniqueInput;
};


export type QueryInvitePartyLinkArgs = {
  partyId: Scalars['String'];
}
export type QueryChatMessagesArgs = {
  where?: Maybe<ChatMessageWhereInput>;
  orderBy?: Maybe<ChatMessageOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<ChatMessageWhereUniqueInput>;
  before?: Maybe<ChatMessageWhereUniqueInput>;
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
  score: Scalars['Int'];
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
  isMine: Scalars['Boolean'];
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

export type RengaWhereInput = {
  id?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  submissions?: Maybe<SubmissionFilter>;
  movieId?: Maybe<IntFilter>;
  authorId?: Maybe<IntFilter>;
  partyId?: Maybe<StringFilter>;
  AND?: Maybe<Array<RengaWhereInput>>;
  OR?: Maybe<Array<RengaWhereInput>>;
  NOT?: Maybe<Array<RengaWhereInput>>;
  movie?: Maybe<MovieWhereInput>;
  author?: Maybe<UserWhereInput>;
  party?: Maybe<PartyWhereInput>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
};

export type SubmissionFilter = {
  every?: Maybe<SubmissionWhereInput>;
  some?: Maybe<SubmissionWhereInput>;
  none?: Maybe<SubmissionWhereInput>;
};

export type SubmissionWhereInput = {
  id?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  authorId?: Maybe<IntFilter>;
  rengaId?: Maybe<IntFilter>;
  valid?: Maybe<BooleanFilter>;
  movieTitle?: Maybe<StringFilter>;
  movieDBId?: Maybe<IntFilter>;
  AND?: Maybe<Array<SubmissionWhereInput>>;
  OR?: Maybe<Array<SubmissionWhereInput>>;
  NOT?: Maybe<Array<SubmissionWhereInput>>;
  author?: Maybe<UserWhereInput>;
  renga?: Maybe<RengaWhereInput>;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type UserWhereInput = {
  id?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  username?: Maybe<StringFilter>;
  partyId?: Maybe<StringFilter>;
  score?: Maybe<IntFilter>;
  rengas?: Maybe<RengaFilter>;
  chatMessages?: Maybe<ChatMessageFilter>;
  submission?: Maybe<SubmissionFilter>;
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  party?: Maybe<PartyWhereInput>;
};

export type RengaFilter = {
  every?: Maybe<RengaWhereInput>;
  some?: Maybe<RengaWhereInput>;
  none?: Maybe<RengaWhereInput>;
};

export type ChatMessageFilter = {
  every?: Maybe<ChatMessageWhereInput>;
  some?: Maybe<ChatMessageWhereInput>;
  none?: Maybe<ChatMessageWhereInput>;
};

export type ChatMessageWhereInput = {
  id?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  authorId?: Maybe<IntFilter>;
  partyId?: Maybe<StringFilter>;
  message?: Maybe<StringFilter>;
  AND?: Maybe<Array<ChatMessageWhereInput>>;
  OR?: Maybe<Array<ChatMessageWhereInput>>;
  NOT?: Maybe<Array<ChatMessageWhereInput>>;
  author?: Maybe<UserWhereInput>;
  party?: Maybe<PartyWhereInput>;
};

export type PartyWhereInput = {
  id?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  rengas?: Maybe<RengaFilter>;
  users?: Maybe<UserFilter>;
  chatMessages?: Maybe<ChatMessageFilter>;
  AND?: Maybe<Array<PartyWhereInput>>;
  OR?: Maybe<Array<PartyWhereInput>>;
  NOT?: Maybe<Array<PartyWhereInput>>;
};

export type UserFilter = {
  every?: Maybe<UserWhereInput>;
  some?: Maybe<UserWhereInput>;
  none?: Maybe<UserWhereInput>;
};

export type MovieWhereInput = {
  id?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  movieDBId?: Maybe<IntFilter>;
  title?: Maybe<StringFilter>;
  year?: Maybe<IntFilter>;
  rengas?: Maybe<RengaFilter>;
  AND?: Maybe<Array<MovieWhereInput>>;
  OR?: Maybe<Array<MovieWhereInput>>;
  NOT?: Maybe<Array<MovieWhereInput>>;
};

export type RengaOrderByInput = {
  id?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
  movie?: Maybe<OrderByArg>;
  movieId?: Maybe<OrderByArg>;
  author?: Maybe<OrderByArg>;
  authorId?: Maybe<OrderByArg>;
  party?: Maybe<OrderByArg>;
  partyId?: Maybe<OrderByArg>;
};

export type PartyWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Party = {
   __typename?: 'Party';
  id: Scalars['String'];
  users: Array<User>;
};


export type PartyUsersArgs = {
  orderBy?: Maybe<PartyUsersOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type PartyUsersOrderByInput = {
  score?: Maybe<OrderByArg>;
};

export type ChatMessageOrderByInput = {
  id?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
  author?: Maybe<OrderByArg>;
  authorId?: Maybe<OrderByArg>;
  party?: Maybe<OrderByArg>;
  partyId?: Maybe<OrderByArg>;
  message?: Maybe<OrderByArg>;
};

export type ChatMessageWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type ChatMessage = {
   __typename?: 'ChatMessage';
  id: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  author: User;
  message: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createOneUser: User;
  createOneRenga: Renga;
  createSubmission: Submission;
  createParty: Scalars['String'];
  joinParty: Scalars['String'];
  createOneChatMessage: ChatMessage;
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


export type MutationJoinPartyArgs = {
  partyId: Scalars['String'];
  username: Scalars['String'];
}
export type MutationCreateOneChatMessageArgs = {
  data: ChatMessageCreateInput;
};

export type UserCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
  score?: Maybe<Scalars['Int']>;
  party: PartyCreateOneWithoutUsersInput;
  rengas?: Maybe<RengaCreateManyWithoutAuthorInput>;
  chatMessages?: Maybe<ChatMessageCreateManyWithoutAuthorInput>;
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
  chatMessages?: Maybe<ChatMessageCreateManyWithoutPartyInput>;
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
  chatMessages?: Maybe<ChatMessageCreateManyWithoutAuthorInput>;
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
  chatMessages?: Maybe<ChatMessageCreateManyWithoutPartyInput>;
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
  chatMessages?: Maybe<ChatMessageCreateManyWithoutAuthorInput>;
  submission?: Maybe<SubmissionCreateManyWithoutAuthorInput>;
};

export type ChatMessageCreateManyWithoutAuthorInput = {
  create?: Maybe<Array<ChatMessageCreateWithoutAuthorInput>>;
  connect?: Maybe<Array<ChatMessageWhereUniqueInput>>;
};

export type ChatMessageCreateWithoutAuthorInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  message: Scalars['String'];
  party: PartyCreateOneWithoutChatMessagesInput;
};

export type PartyCreateOneWithoutChatMessagesInput = {
  create?: Maybe<PartyCreateWithoutChatMessagesInput>;
  connect?: Maybe<PartyWhereUniqueInput>;
};

export type PartyCreateWithoutChatMessagesInput = {
  id: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  rengas?: Maybe<RengaCreateManyWithoutPartyInput>;
  users?: Maybe<UserCreateManyWithoutPartyInput>;
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
  chatMessages?: Maybe<ChatMessageCreateManyWithoutAuthorInput>;
  submission?: Maybe<SubmissionCreateManyWithoutAuthorInput>;
};

export type ChatMessageCreateManyWithoutPartyInput = {
  create?: Maybe<Array<ChatMessageCreateWithoutPartyInput>>;
  connect?: Maybe<Array<ChatMessageWhereUniqueInput>>;
};

export type ChatMessageCreateWithoutPartyInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  message: Scalars['String'];
  author: UserCreateOneWithoutChatMessagesInput;
};

export type UserCreateOneWithoutChatMessagesInput = {
  create?: Maybe<UserCreateWithoutChatMessagesInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type UserCreateWithoutChatMessagesInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
  score?: Maybe<Scalars['Int']>;
  party: PartyCreateOneWithoutUsersInput;
  rengas?: Maybe<RengaCreateManyWithoutAuthorInput>;
  submission?: Maybe<SubmissionCreateManyWithoutAuthorInput>;
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

export type ChatMessageCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  message: Scalars['String'];
  author: UserCreateOneWithoutChatMessagesInput;
  party: PartyCreateOneWithoutChatMessagesInput;
};

export type CreatePartyMutationVariables = {
  username: Scalars['String'];
};


export type CreatePartyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createParty'>
);

export type GetRengasQueryVariables = {
  partyId: Scalars['String'];
};


export type GetRengasQuery = (
  { __typename?: 'Query' }
  & { rengas: Array<(
    { __typename?: 'Renga' }
    & Pick<Renga, 'id' | 'emojis' | 'createdAt' | 'isMine'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type JoinPartyMutationVariables = {
  partyId: Scalars['String'];
  username: Scalars['String'];
};


export type JoinPartyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinParty'>
);
export type GetChatMessagesQueryVariables = {
  partyId: Scalars['String'];
};


export type GetChatMessagesQuery = (
  { __typename?: 'Query' }
  & { chatMessages: Array<(
    { __typename?: 'ChatMessage' }
    & Pick<ChatMessage, 'id' | 'message' | 'createdAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type PostMessageMutationVariables = {
  partyId: Scalars['String'];
  authorId?: Maybe<Scalars['Int']>;
  message: Scalars['String'];
};


export type PostMessageMutation = (
  { __typename?: 'Mutation' }
  & { createOneChatMessage: (
    { __typename?: 'ChatMessage' }
    & Pick<ChatMessage, 'id' | 'message' | 'createdAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
>>>>>>> POC Chat
);

export type GetPlayersQueryVariables = {
  partyId: Scalars['String'];
};


export type GetPlayersQuery = (
  { __typename?: 'Query' }
  & { party?: Maybe<(
    { __typename?: 'Party' }
    & Pick<Party, 'id'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'score'>
    )> }
  )> }
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
    & Pick<Renga, 'id' | 'emojis' | 'createdAt' | 'isResolved' | 'isMine'>
    & { movie: (
      { __typename?: 'Movie' }
      & Pick<Movie, 'maybeTitle' | 'movieDBId'>
    ), author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), submissions: Array<(
      { __typename?: 'Submission' }
      & Pick<Submission, 'id' | 'createdAt' | 'maybeTitle' | 'valid'>
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
export const GetRengasDocument = gql`
    query GetRengas($partyId: String!) {
  rengas(where: {partyId: {equals: $partyId}}, orderBy: {createdAt: desc}) {
    id
    emojis
    author {
      id
      username
    }
    createdAt
    isMine
  }
}
    `;

/**
 * __useGetRengasQuery__
 *
 * To run a query within a React component, call `useGetRengasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRengasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRengasQuery({
 *   variables: {
 *      partyId: // value for 'partyId'
 *   },
 * });
 */
export function useGetRengasQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRengasQuery, GetRengasQueryVariables>) {
        return ApolloReactHooks.useQuery<GetRengasQuery, GetRengasQueryVariables>(GetRengasDocument, baseOptions);
      }
export function useGetRengasLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRengasQuery, GetRengasQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetRengasQuery, GetRengasQueryVariables>(GetRengasDocument, baseOptions);
        }
export type GetRengasQueryHookResult = ReturnType<typeof useGetRengasQuery>;
export type GetRengasLazyQueryHookResult = ReturnType<typeof useGetRengasLazyQuery>;
export type GetRengasQueryResult = ApolloReactCommon.QueryResult<GetRengasQuery, GetRengasQueryVariables>;
export const JoinPartyDocument = gql`
    mutation joinParty($partyId: String!, $username: String!) {
  joinParty(partyId: $partyId, username: $username)
  `
export const GetChatMessagesDocument = gql`
    query GetChatMessages($partyId: String!) {
  chatMessages(where: {partyId: {equals: $partyId}}, orderBy: {createdAt: asc}) {
    id
    message
    createdAt
    author {
      id
      username
    }
  }
}
    `;

/**
<<<<<<< HEAD
 * __useJoinPartyMutation__
 *
 * To run a mutation, you first call `useJoinPartyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinPartyMutation` returns a tuple that includes:
=======
 * __useGetChatMessagesQuery__
 *
 * To run a query within a React component, call `useGetChatMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatMessagesQuery({
 *   variables: {
 *      partyId: // value for 'partyId'
 *   },
 * });
 */
export function useGetChatMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, baseOptions);
      }
export function useGetChatMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, baseOptions);
        }
export type GetChatMessagesQueryHookResult = ReturnType<typeof useGetChatMessagesQuery>;
export type GetChatMessagesLazyQueryHookResult = ReturnType<typeof useGetChatMessagesLazyQuery>;
export type GetChatMessagesQueryResult = ApolloReactCommon.QueryResult<GetChatMessagesQuery, GetChatMessagesQueryVariables>;
export const PostMessageDocument = gql`
    mutation PostMessage($partyId: String!, $authorId: Int, $message: String!) {
  createOneChatMessage(data: {message: $message, author: {connect: {id: $authorId}}, party: {connect: {id: $partyId}}}) {
    id
    message
    createdAt
    author {
      id
      username
    }
  }
}
    `;

/**
 * __usePostMessageMutation__
 *
 * To run a mutation, you first call `usePostMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMessageMutation` returns a tuple that includes:
>>>>>>> POC Chat
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
<<<<<<< HEAD
 * const [joinPartyMutation, { data, loading, error }] = useJoinPartyMutation({
 *   variables: {
 *      partyId: // value for 'partyId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useJoinPartyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinPartyMutation, JoinPartyMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinPartyMutation, JoinPartyMutationVariables>(JoinPartyDocument, baseOptions);
      }
export type JoinPartyMutationHookResult = ReturnType<typeof useJoinPartyMutation>;
export type JoinPartyMutationResult = ApolloReactCommon.MutationResult<JoinPartyMutation>;
export type JoinPartyMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinPartyMutation, JoinPartyMutationVariables>;
=======
 * const [postMessageMutation, { data, loading, error }] = usePostMessageMutation({
 *   variables: {
 *      partyId: // value for 'partyId'
 *      authorId: // value for 'authorId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function usePostMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PostMessageMutation, PostMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<PostMessageMutation, PostMessageMutationVariables>(PostMessageDocument, baseOptions);
      }
export type PostMessageMutationHookResult = ReturnType<typeof usePostMessageMutation>;
export type PostMessageMutationResult = ApolloReactCommon.MutationResult<PostMessageMutation>;
export type PostMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<PostMessageMutation, PostMessageMutationVariables>;
>>>>>>> POC Chat
export const GetPlayersDocument = gql`
    query getPlayers($partyId: String!) {
  party(where: {id: $partyId}) {
    id
    users(orderBy: {score: desc}) {
      id
      username
      score
    }
  }
}
    `;

/**
 * __useGetPlayersQuery__
 *
 * To run a query within a React component, call `useGetPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayersQuery({
 *   variables: {
 *      partyId: // value for 'partyId'
 *   },
 * });
 */
export function useGetPlayersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, baseOptions);
      }
export function useGetPlayersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, baseOptions);
        }
export type GetPlayersQueryHookResult = ReturnType<typeof useGetPlayersQuery>;
export type GetPlayersLazyQueryHookResult = ReturnType<typeof useGetPlayersLazyQuery>;
export type GetPlayersQueryResult = ApolloReactCommon.QueryResult<GetPlayersQuery, GetPlayersQueryVariables>;
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
    isMine
    movie {
      maybeTitle
      movieDBId
    }
    author {
      id
      username
    }
    submissions(orderBy: {createdAt: desc}) {
      id
      author {
        id
        username
      }
      createdAt
      maybeTitle
      valid
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