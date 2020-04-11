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
  createParty: Scalars['String'];
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