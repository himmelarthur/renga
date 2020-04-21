import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    DateTime: any
}

export type Query = {
    __typename?: 'Query'
    user?: Maybe<User>
    renga?: Maybe<Renga>
    rengas: Array<Renga>
    party?: Maybe<Party>
}

export type QueryUserArgs = {
    where: UserWhereUniqueInput
}

export type QueryRengaArgs = {
    where: RengaWhereUniqueInput
}

export type QueryRengasArgs = {
    where?: Maybe<RengaWhereInput>
    orderBy?: Maybe<RengaOrderByInput>
    skip?: Maybe<Scalars['Int']>
    after?: Maybe<RengaWhereUniqueInput>
    before?: Maybe<RengaWhereUniqueInput>
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
}

export type QueryPartyArgs = {
    where: PartyWhereUniqueInput
}

export type UserWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>
}

export type User = {
    __typename?: 'User'
    id: Scalars['Int']
    username: Scalars['String']
    score: Scalars['Int']
    solvedCount: Scalars['Int']
    postedCount: Scalars['Int']
}

export type RengaWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>
}

export type Renga = {
    __typename?: 'Renga'
    id: Scalars['Int']
    createdAt: Scalars['DateTime']
    deletedAt?: Maybe<Scalars['DateTime']>
    author: User
    movie: Movie
    submissions: Array<Submission>
    emojis: Array<Scalars['String']>
    status: Status
}

export type RengaSubmissionsArgs = {
    where?: Maybe<RengaSubmissionsWhereInput>
    orderBy?: Maybe<RengaSubmissionsOrderByInput>
    skip?: Maybe<Scalars['Int']>
    after?: Maybe<SubmissionWhereUniqueInput>
    before?: Maybe<SubmissionWhereUniqueInput>
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
}

export type Movie = {
    __typename?: 'Movie'
    id: Scalars['Int']
    movieDBId: Scalars['Int']
}

export type RengaSubmissionsWhereInput = {
    authorId?: Maybe<IntFilter>
    valid?: Maybe<BooleanFilter>
}

export type IntFilter = {
    equals?: Maybe<Scalars['Int']>
    not?: Maybe<Scalars['Int']>
    in?: Maybe<Array<Scalars['Int']>>
    notIn?: Maybe<Array<Scalars['Int']>>
    lt?: Maybe<Scalars['Int']>
    lte?: Maybe<Scalars['Int']>
    gt?: Maybe<Scalars['Int']>
    gte?: Maybe<Scalars['Int']>
}

export type BooleanFilter = {
    equals?: Maybe<Scalars['Boolean']>
    not?: Maybe<Scalars['Boolean']>
}

export type RengaSubmissionsOrderByInput = {
    createdAt?: Maybe<OrderByArg>
}

export enum OrderByArg {
    Asc = 'asc',
    Desc = 'desc',
}

export type SubmissionWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>
}

export type Submission = {
    __typename?: 'Submission'
    id: Scalars['Int']
    valid: Scalars['Boolean']
    author: User
    createdAt: Scalars['DateTime']
    maybeTitle: Scalars['String']
}

export type Status = {
    __typename?: 'Status'
    maybeTitle: Scalars['String']
    isMine: Scalars['Boolean']
    isResolved: Scalars['Boolean']
}

export type RengaWhereInput = {
    id?: Maybe<IntFilter>
    createdAt?: Maybe<DateTimeFilter>
    updatedAt?: Maybe<DateTimeFilter>
    deletedAt?: Maybe<NullableDateTimeFilter>
    submissions?: Maybe<SubmissionFilter>
    movieId?: Maybe<IntFilter>
    authorId?: Maybe<IntFilter>
    partyId?: Maybe<StringFilter>
    AND?: Maybe<Array<RengaWhereInput>>
    OR?: Maybe<Array<RengaWhereInput>>
    NOT?: Maybe<Array<RengaWhereInput>>
    movie?: Maybe<MovieWhereInput>
    author?: Maybe<UserWhereInput>
    party?: Maybe<PartyWhereInput>
}

export type DateTimeFilter = {
    equals?: Maybe<Scalars['DateTime']>
    not?: Maybe<Scalars['DateTime']>
    in?: Maybe<Array<Scalars['DateTime']>>
    notIn?: Maybe<Array<Scalars['DateTime']>>
    lt?: Maybe<Scalars['DateTime']>
    lte?: Maybe<Scalars['DateTime']>
    gt?: Maybe<Scalars['DateTime']>
    gte?: Maybe<Scalars['DateTime']>
}

export type NullableDateTimeFilter = {
    equals?: Maybe<Scalars['DateTime']>
    not?: Maybe<Scalars['DateTime']>
    in?: Maybe<Array<Scalars['DateTime']>>
    notIn?: Maybe<Array<Scalars['DateTime']>>
    lt?: Maybe<Scalars['DateTime']>
    lte?: Maybe<Scalars['DateTime']>
    gt?: Maybe<Scalars['DateTime']>
    gte?: Maybe<Scalars['DateTime']>
}

export type SubmissionFilter = {
    every?: Maybe<SubmissionWhereInput>
    some?: Maybe<SubmissionWhereInput>
    none?: Maybe<SubmissionWhereInput>
}

export type SubmissionWhereInput = {
    id?: Maybe<IntFilter>
    createdAt?: Maybe<DateTimeFilter>
    updatedAt?: Maybe<DateTimeFilter>
    authorId?: Maybe<IntFilter>
    rengaId?: Maybe<IntFilter>
    valid?: Maybe<BooleanFilter>
    movieTitle?: Maybe<StringFilter>
    movieDBId?: Maybe<IntFilter>
    AND?: Maybe<Array<SubmissionWhereInput>>
    OR?: Maybe<Array<SubmissionWhereInput>>
    NOT?: Maybe<Array<SubmissionWhereInput>>
    author?: Maybe<UserWhereInput>
    renga?: Maybe<RengaWhereInput>
}

export type StringFilter = {
    equals?: Maybe<Scalars['String']>
    not?: Maybe<Scalars['String']>
    in?: Maybe<Array<Scalars['String']>>
    notIn?: Maybe<Array<Scalars['String']>>
    lt?: Maybe<Scalars['String']>
    lte?: Maybe<Scalars['String']>
    gt?: Maybe<Scalars['String']>
    gte?: Maybe<Scalars['String']>
    contains?: Maybe<Scalars['String']>
    startsWith?: Maybe<Scalars['String']>
    endsWith?: Maybe<Scalars['String']>
}

export type UserWhereInput = {
    id?: Maybe<IntFilter>
    createdAt?: Maybe<DateTimeFilter>
    updatedAt?: Maybe<DateTimeFilter>
    username?: Maybe<StringFilter>
    partyId?: Maybe<StringFilter>
    score?: Maybe<IntFilter>
    rengas?: Maybe<RengaFilter>
    submission?: Maybe<SubmissionFilter>
    AND?: Maybe<Array<UserWhereInput>>
    OR?: Maybe<Array<UserWhereInput>>
    NOT?: Maybe<Array<UserWhereInput>>
    party?: Maybe<PartyWhereInput>
}

export type RengaFilter = {
    every?: Maybe<RengaWhereInput>
    some?: Maybe<RengaWhereInput>
    none?: Maybe<RengaWhereInput>
}

export type PartyWhereInput = {
    id?: Maybe<StringFilter>
    createdAt?: Maybe<DateTimeFilter>
    updatedAt?: Maybe<DateTimeFilter>
    rengas?: Maybe<RengaFilter>
    users?: Maybe<UserFilter>
    AND?: Maybe<Array<PartyWhereInput>>
    OR?: Maybe<Array<PartyWhereInput>>
    NOT?: Maybe<Array<PartyWhereInput>>
}

export type UserFilter = {
    every?: Maybe<UserWhereInput>
    some?: Maybe<UserWhereInput>
    none?: Maybe<UserWhereInput>
}

export type MovieWhereInput = {
    id?: Maybe<IntFilter>
    createdAt?: Maybe<DateTimeFilter>
    updatedAt?: Maybe<DateTimeFilter>
    movieDBId?: Maybe<IntFilter>
    title?: Maybe<StringFilter>
    year?: Maybe<IntFilter>
    rengas?: Maybe<RengaFilter>
    AND?: Maybe<Array<MovieWhereInput>>
    OR?: Maybe<Array<MovieWhereInput>>
    NOT?: Maybe<Array<MovieWhereInput>>
}

export type RengaOrderByInput = {
    id?: Maybe<OrderByArg>
    createdAt?: Maybe<OrderByArg>
    updatedAt?: Maybe<OrderByArg>
    deletedAt?: Maybe<OrderByArg>
    movie?: Maybe<OrderByArg>
    movieId?: Maybe<OrderByArg>
    author?: Maybe<OrderByArg>
    authorId?: Maybe<OrderByArg>
    party?: Maybe<OrderByArg>
    partyId?: Maybe<OrderByArg>
}

export type PartyWhereUniqueInput = {
    id?: Maybe<Scalars['String']>
}

export type Party = {
    __typename?: 'Party'
    id: Scalars['String']
    users: Array<User>
}

export type PartyUsersArgs = {
    orderBy?: Maybe<PartyUsersOrderByInput>
    skip?: Maybe<Scalars['Int']>
    after?: Maybe<UserWhereUniqueInput>
    before?: Maybe<UserWhereUniqueInput>
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
}

export type PartyUsersOrderByInput = {
    score?: Maybe<OrderByArg>
}

export type Mutation = {
    __typename?: 'Mutation'
    createOneRenga: Renga
    updateOneRenga?: Maybe<Renga>
    createSubmission: Submission
    createParty: Scalars['String']
    joinParty: Scalars['String']
}

export type MutationCreateOneRengaArgs = {
    data: RengaCreateInput
}

export type MutationUpdateOneRengaArgs = {
    data: RengaUpdateInput
    where: RengaWhereUniqueInput
}

export type MutationCreateSubmissionArgs = {
    rengaId: Scalars['Int']
    movieDBId: Scalars['Int']
    movieTitle: Scalars['String']
}

export type MutationCreatePartyArgs = {
    username: Scalars['String']
}

export type MutationJoinPartyArgs = {
    partyId: Scalars['String']
    username: Scalars['String']
}

export type RengaCreateInput = {
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    deletedAt?: Maybe<Scalars['DateTime']>
    emojis?: Maybe<RengaCreateemojisInput>
    submissions?: Maybe<SubmissionCreateManyWithoutRengaInput>
    movie: MovieCreateOneWithoutRengasInput
    author: UserCreateOneWithoutRengasInput
    party: PartyCreateOneWithoutRengasInput
}

export type RengaCreateemojisInput = {
    set?: Maybe<Array<Scalars['String']>>
}

export type SubmissionCreateManyWithoutRengaInput = {
    create?: Maybe<Array<SubmissionCreateWithoutRengaInput>>
    connect?: Maybe<Array<SubmissionWhereUniqueInput>>
}

export type SubmissionCreateWithoutRengaInput = {
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    valid?: Maybe<Scalars['Boolean']>
    movieTitle: Scalars['String']
    movieDBId: Scalars['Int']
    author: UserCreateOneWithoutSubmissionInput
}

export type UserCreateOneWithoutSubmissionInput = {
    create?: Maybe<UserCreateWithoutSubmissionInput>
    connect?: Maybe<UserWhereUniqueInput>
}

export type UserCreateWithoutSubmissionInput = {
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    username: Scalars['String']
    score?: Maybe<Scalars['Int']>
    party: PartyCreateOneWithoutUsersInput
    rengas?: Maybe<RengaCreateManyWithoutAuthorInput>
}

export type PartyCreateOneWithoutUsersInput = {
    create?: Maybe<PartyCreateWithoutUsersInput>
    connect?: Maybe<PartyWhereUniqueInput>
}

export type PartyCreateWithoutUsersInput = {
    id: Scalars['String']
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    rengas?: Maybe<RengaCreateManyWithoutPartyInput>
}

export type RengaCreateManyWithoutPartyInput = {
    create?: Maybe<Array<RengaCreateWithoutPartyInput>>
    connect?: Maybe<Array<RengaWhereUniqueInput>>
}

export type RengaCreateWithoutPartyInput = {
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    deletedAt?: Maybe<Scalars['DateTime']>
    emojis?: Maybe<RengaCreateemojisInput>
    submissions?: Maybe<SubmissionCreateManyWithoutRengaInput>
    movie: MovieCreateOneWithoutRengasInput
    author: UserCreateOneWithoutRengasInput
}

export type MovieCreateOneWithoutRengasInput = {
    create?: Maybe<MovieCreateWithoutRengasInput>
    connect?: Maybe<MovieWhereUniqueInput>
}

export type MovieCreateWithoutRengasInput = {
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    movieDBId: Scalars['Int']
    title: Scalars['String']
    year: Scalars['Int']
    genres?: Maybe<MovieCreategenresInput>
}

export type MovieCreategenresInput = {
    set?: Maybe<Array<Scalars['String']>>
}

export type MovieWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>
}

export type UserCreateOneWithoutRengasInput = {
    create?: Maybe<UserCreateWithoutRengasInput>
    connect?: Maybe<UserWhereUniqueInput>
}

export type UserCreateWithoutRengasInput = {
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    username: Scalars['String']
    score?: Maybe<Scalars['Int']>
    party: PartyCreateOneWithoutUsersInput
    submission?: Maybe<SubmissionCreateManyWithoutAuthorInput>
}

export type SubmissionCreateManyWithoutAuthorInput = {
    create?: Maybe<Array<SubmissionCreateWithoutAuthorInput>>
    connect?: Maybe<Array<SubmissionWhereUniqueInput>>
}

export type SubmissionCreateWithoutAuthorInput = {
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    valid?: Maybe<Scalars['Boolean']>
    movieTitle: Scalars['String']
    movieDBId: Scalars['Int']
    renga: RengaCreateOneWithoutSubmissionsInput
}

export type RengaCreateOneWithoutSubmissionsInput = {
    create?: Maybe<RengaCreateWithoutSubmissionsInput>
    connect?: Maybe<RengaWhereUniqueInput>
}

export type RengaCreateWithoutSubmissionsInput = {
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    deletedAt?: Maybe<Scalars['DateTime']>
    emojis?: Maybe<RengaCreateemojisInput>
    movie: MovieCreateOneWithoutRengasInput
    author: UserCreateOneWithoutRengasInput
    party: PartyCreateOneWithoutRengasInput
}

export type PartyCreateOneWithoutRengasInput = {
    create?: Maybe<PartyCreateWithoutRengasInput>
    connect?: Maybe<PartyWhereUniqueInput>
}

export type PartyCreateWithoutRengasInput = {
    id: Scalars['String']
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    users?: Maybe<UserCreateManyWithoutPartyInput>
}

export type UserCreateManyWithoutPartyInput = {
    create?: Maybe<Array<UserCreateWithoutPartyInput>>
    connect?: Maybe<Array<UserWhereUniqueInput>>
}

export type UserCreateWithoutPartyInput = {
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    username: Scalars['String']
    score?: Maybe<Scalars['Int']>
    rengas?: Maybe<RengaCreateManyWithoutAuthorInput>
    submission?: Maybe<SubmissionCreateManyWithoutAuthorInput>
}

export type RengaCreateManyWithoutAuthorInput = {
    create?: Maybe<Array<RengaCreateWithoutAuthorInput>>
    connect?: Maybe<Array<RengaWhereUniqueInput>>
}

export type RengaCreateWithoutAuthorInput = {
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    deletedAt?: Maybe<Scalars['DateTime']>
    emojis?: Maybe<RengaCreateemojisInput>
    submissions?: Maybe<SubmissionCreateManyWithoutRengaInput>
    movie: MovieCreateOneWithoutRengasInput
    party: PartyCreateOneWithoutRengasInput
}

export type RengaUpdateInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    deletedAt?: Maybe<Scalars['DateTime']>
    emojis?: Maybe<RengaUpdateemojisInput>
    submissions?: Maybe<SubmissionUpdateManyWithoutRengaInput>
    movie?: Maybe<MovieUpdateOneRequiredWithoutRengasInput>
    author?: Maybe<UserUpdateOneRequiredWithoutRengasInput>
    party?: Maybe<PartyUpdateOneRequiredWithoutRengasInput>
}

export type RengaUpdateemojisInput = {
    set?: Maybe<Array<Scalars['String']>>
}

export type SubmissionUpdateManyWithoutRengaInput = {
    create?: Maybe<Array<SubmissionCreateWithoutRengaInput>>
    connect?: Maybe<Array<SubmissionWhereUniqueInput>>
    set?: Maybe<Array<SubmissionWhereUniqueInput>>
    disconnect?: Maybe<Array<SubmissionWhereUniqueInput>>
    delete?: Maybe<Array<SubmissionWhereUniqueInput>>
    update?: Maybe<Array<SubmissionUpdateWithWhereUniqueWithoutRengaInput>>
    updateMany?: Maybe<Array<SubmissionUpdateManyWithWhereNestedInput>>
    deleteMany?: Maybe<Array<SubmissionScalarWhereInput>>
    upsert?: Maybe<Array<SubmissionUpsertWithWhereUniqueWithoutRengaInput>>
}

export type SubmissionUpdateWithWhereUniqueWithoutRengaInput = {
    where: SubmissionWhereUniqueInput
    data: SubmissionUpdateWithoutRengaDataInput
}

export type SubmissionUpdateWithoutRengaDataInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    valid?: Maybe<Scalars['Boolean']>
    movieTitle?: Maybe<Scalars['String']>
    movieDBId?: Maybe<Scalars['Int']>
    author?: Maybe<UserUpdateOneRequiredWithoutSubmissionInput>
}

export type UserUpdateOneRequiredWithoutSubmissionInput = {
    create?: Maybe<UserCreateWithoutSubmissionInput>
    connect?: Maybe<UserWhereUniqueInput>
    update?: Maybe<UserUpdateWithoutSubmissionDataInput>
    upsert?: Maybe<UserUpsertWithoutSubmissionInput>
}

export type UserUpdateWithoutSubmissionDataInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    username?: Maybe<Scalars['String']>
    score?: Maybe<Scalars['Int']>
    party?: Maybe<PartyUpdateOneRequiredWithoutUsersInput>
    rengas?: Maybe<RengaUpdateManyWithoutAuthorInput>
}

export type PartyUpdateOneRequiredWithoutUsersInput = {
    create?: Maybe<PartyCreateWithoutUsersInput>
    connect?: Maybe<PartyWhereUniqueInput>
    update?: Maybe<PartyUpdateWithoutUsersDataInput>
    upsert?: Maybe<PartyUpsertWithoutUsersInput>
}

export type PartyUpdateWithoutUsersDataInput = {
    id?: Maybe<Scalars['String']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    rengas?: Maybe<RengaUpdateManyWithoutPartyInput>
}

export type RengaUpdateManyWithoutPartyInput = {
    create?: Maybe<Array<RengaCreateWithoutPartyInput>>
    connect?: Maybe<Array<RengaWhereUniqueInput>>
    set?: Maybe<Array<RengaWhereUniqueInput>>
    disconnect?: Maybe<Array<RengaWhereUniqueInput>>
    delete?: Maybe<Array<RengaWhereUniqueInput>>
    update?: Maybe<Array<RengaUpdateWithWhereUniqueWithoutPartyInput>>
    updateMany?: Maybe<Array<RengaUpdateManyWithWhereNestedInput>>
    deleteMany?: Maybe<Array<RengaScalarWhereInput>>
    upsert?: Maybe<Array<RengaUpsertWithWhereUniqueWithoutPartyInput>>
}

export type RengaUpdateWithWhereUniqueWithoutPartyInput = {
    where: RengaWhereUniqueInput
    data: RengaUpdateWithoutPartyDataInput
}

export type RengaUpdateWithoutPartyDataInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    deletedAt?: Maybe<Scalars['DateTime']>
    emojis?: Maybe<RengaUpdateemojisInput>
    submissions?: Maybe<SubmissionUpdateManyWithoutRengaInput>
    movie?: Maybe<MovieUpdateOneRequiredWithoutRengasInput>
    author?: Maybe<UserUpdateOneRequiredWithoutRengasInput>
}

export type MovieUpdateOneRequiredWithoutRengasInput = {
    create?: Maybe<MovieCreateWithoutRengasInput>
    connect?: Maybe<MovieWhereUniqueInput>
    update?: Maybe<MovieUpdateWithoutRengasDataInput>
    upsert?: Maybe<MovieUpsertWithoutRengasInput>
}

export type MovieUpdateWithoutRengasDataInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    movieDBId?: Maybe<Scalars['Int']>
    title?: Maybe<Scalars['String']>
    year?: Maybe<Scalars['Int']>
    genres?: Maybe<MovieUpdategenresInput>
}

export type MovieUpdategenresInput = {
    set?: Maybe<Array<Scalars['String']>>
}

export type MovieUpsertWithoutRengasInput = {
    update: MovieUpdateWithoutRengasDataInput
    create: MovieCreateWithoutRengasInput
}

export type UserUpdateOneRequiredWithoutRengasInput = {
    create?: Maybe<UserCreateWithoutRengasInput>
    connect?: Maybe<UserWhereUniqueInput>
    update?: Maybe<UserUpdateWithoutRengasDataInput>
    upsert?: Maybe<UserUpsertWithoutRengasInput>
}

export type UserUpdateWithoutRengasDataInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    username?: Maybe<Scalars['String']>
    score?: Maybe<Scalars['Int']>
    party?: Maybe<PartyUpdateOneRequiredWithoutUsersInput>
    submission?: Maybe<SubmissionUpdateManyWithoutAuthorInput>
}

export type SubmissionUpdateManyWithoutAuthorInput = {
    create?: Maybe<Array<SubmissionCreateWithoutAuthorInput>>
    connect?: Maybe<Array<SubmissionWhereUniqueInput>>
    set?: Maybe<Array<SubmissionWhereUniqueInput>>
    disconnect?: Maybe<Array<SubmissionWhereUniqueInput>>
    delete?: Maybe<Array<SubmissionWhereUniqueInput>>
    update?: Maybe<Array<SubmissionUpdateWithWhereUniqueWithoutAuthorInput>>
    updateMany?: Maybe<Array<SubmissionUpdateManyWithWhereNestedInput>>
    deleteMany?: Maybe<Array<SubmissionScalarWhereInput>>
    upsert?: Maybe<Array<SubmissionUpsertWithWhereUniqueWithoutAuthorInput>>
}

export type SubmissionUpdateWithWhereUniqueWithoutAuthorInput = {
    where: SubmissionWhereUniqueInput
    data: SubmissionUpdateWithoutAuthorDataInput
}

export type SubmissionUpdateWithoutAuthorDataInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    valid?: Maybe<Scalars['Boolean']>
    movieTitle?: Maybe<Scalars['String']>
    movieDBId?: Maybe<Scalars['Int']>
    renga?: Maybe<RengaUpdateOneRequiredWithoutSubmissionsInput>
}

export type RengaUpdateOneRequiredWithoutSubmissionsInput = {
    create?: Maybe<RengaCreateWithoutSubmissionsInput>
    connect?: Maybe<RengaWhereUniqueInput>
    update?: Maybe<RengaUpdateWithoutSubmissionsDataInput>
    upsert?: Maybe<RengaUpsertWithoutSubmissionsInput>
}

export type RengaUpdateWithoutSubmissionsDataInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    deletedAt?: Maybe<Scalars['DateTime']>
    emojis?: Maybe<RengaUpdateemojisInput>
    movie?: Maybe<MovieUpdateOneRequiredWithoutRengasInput>
    author?: Maybe<UserUpdateOneRequiredWithoutRengasInput>
    party?: Maybe<PartyUpdateOneRequiredWithoutRengasInput>
}

export type PartyUpdateOneRequiredWithoutRengasInput = {
    create?: Maybe<PartyCreateWithoutRengasInput>
    connect?: Maybe<PartyWhereUniqueInput>
    update?: Maybe<PartyUpdateWithoutRengasDataInput>
    upsert?: Maybe<PartyUpsertWithoutRengasInput>
}

export type PartyUpdateWithoutRengasDataInput = {
    id?: Maybe<Scalars['String']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    users?: Maybe<UserUpdateManyWithoutPartyInput>
}

export type UserUpdateManyWithoutPartyInput = {
    create?: Maybe<Array<UserCreateWithoutPartyInput>>
    connect?: Maybe<Array<UserWhereUniqueInput>>
    set?: Maybe<Array<UserWhereUniqueInput>>
    disconnect?: Maybe<Array<UserWhereUniqueInput>>
    delete?: Maybe<Array<UserWhereUniqueInput>>
    update?: Maybe<Array<UserUpdateWithWhereUniqueWithoutPartyInput>>
    updateMany?: Maybe<Array<UserUpdateManyWithWhereNestedInput>>
    deleteMany?: Maybe<Array<UserScalarWhereInput>>
    upsert?: Maybe<Array<UserUpsertWithWhereUniqueWithoutPartyInput>>
}

export type UserUpdateWithWhereUniqueWithoutPartyInput = {
    where: UserWhereUniqueInput
    data: UserUpdateWithoutPartyDataInput
}

export type UserUpdateWithoutPartyDataInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    username?: Maybe<Scalars['String']>
    score?: Maybe<Scalars['Int']>
    rengas?: Maybe<RengaUpdateManyWithoutAuthorInput>
    submission?: Maybe<SubmissionUpdateManyWithoutAuthorInput>
}

export type RengaUpdateManyWithoutAuthorInput = {
    create?: Maybe<Array<RengaCreateWithoutAuthorInput>>
    connect?: Maybe<Array<RengaWhereUniqueInput>>
    set?: Maybe<Array<RengaWhereUniqueInput>>
    disconnect?: Maybe<Array<RengaWhereUniqueInput>>
    delete?: Maybe<Array<RengaWhereUniqueInput>>
    update?: Maybe<Array<RengaUpdateWithWhereUniqueWithoutAuthorInput>>
    updateMany?: Maybe<Array<RengaUpdateManyWithWhereNestedInput>>
    deleteMany?: Maybe<Array<RengaScalarWhereInput>>
    upsert?: Maybe<Array<RengaUpsertWithWhereUniqueWithoutAuthorInput>>
}

export type RengaUpdateWithWhereUniqueWithoutAuthorInput = {
    where: RengaWhereUniqueInput
    data: RengaUpdateWithoutAuthorDataInput
}

export type RengaUpdateWithoutAuthorDataInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    deletedAt?: Maybe<Scalars['DateTime']>
    emojis?: Maybe<RengaUpdateemojisInput>
    submissions?: Maybe<SubmissionUpdateManyWithoutRengaInput>
    movie?: Maybe<MovieUpdateOneRequiredWithoutRengasInput>
    party?: Maybe<PartyUpdateOneRequiredWithoutRengasInput>
}

export type RengaUpdateManyWithWhereNestedInput = {
    where: RengaScalarWhereInput
    data: RengaUpdateManyDataInput
}

export type RengaScalarWhereInput = {
    id?: Maybe<IntFilter>
    createdAt?: Maybe<DateTimeFilter>
    updatedAt?: Maybe<DateTimeFilter>
    deletedAt?: Maybe<NullableDateTimeFilter>
    submissions?: Maybe<SubmissionFilter>
    movieId?: Maybe<IntFilter>
    authorId?: Maybe<IntFilter>
    partyId?: Maybe<StringFilter>
    AND?: Maybe<Array<RengaScalarWhereInput>>
    OR?: Maybe<Array<RengaScalarWhereInput>>
    NOT?: Maybe<Array<RengaScalarWhereInput>>
}

export type RengaUpdateManyDataInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    deletedAt?: Maybe<Scalars['DateTime']>
    emojis?: Maybe<RengaUpdateemojisInput>
}

export type RengaUpsertWithWhereUniqueWithoutAuthorInput = {
    where: RengaWhereUniqueInput
    update: RengaUpdateWithoutAuthorDataInput
    create: RengaCreateWithoutAuthorInput
}

export type UserUpdateManyWithWhereNestedInput = {
    where: UserScalarWhereInput
    data: UserUpdateManyDataInput
}

export type UserScalarWhereInput = {
    id?: Maybe<IntFilter>
    createdAt?: Maybe<DateTimeFilter>
    updatedAt?: Maybe<DateTimeFilter>
    username?: Maybe<StringFilter>
    partyId?: Maybe<StringFilter>
    score?: Maybe<IntFilter>
    rengas?: Maybe<RengaFilter>
    submission?: Maybe<SubmissionFilter>
    AND?: Maybe<Array<UserScalarWhereInput>>
    OR?: Maybe<Array<UserScalarWhereInput>>
    NOT?: Maybe<Array<UserScalarWhereInput>>
}

export type UserUpdateManyDataInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    username?: Maybe<Scalars['String']>
    score?: Maybe<Scalars['Int']>
}

export type UserUpsertWithWhereUniqueWithoutPartyInput = {
    where: UserWhereUniqueInput
    update: UserUpdateWithoutPartyDataInput
    create: UserCreateWithoutPartyInput
}

export type PartyUpsertWithoutRengasInput = {
    update: PartyUpdateWithoutRengasDataInput
    create: PartyCreateWithoutRengasInput
}

export type RengaUpsertWithoutSubmissionsInput = {
    update: RengaUpdateWithoutSubmissionsDataInput
    create: RengaCreateWithoutSubmissionsInput
}

export type SubmissionUpdateManyWithWhereNestedInput = {
    where: SubmissionScalarWhereInput
    data: SubmissionUpdateManyDataInput
}

export type SubmissionScalarWhereInput = {
    id?: Maybe<IntFilter>
    createdAt?: Maybe<DateTimeFilter>
    updatedAt?: Maybe<DateTimeFilter>
    authorId?: Maybe<IntFilter>
    rengaId?: Maybe<IntFilter>
    valid?: Maybe<BooleanFilter>
    movieTitle?: Maybe<StringFilter>
    movieDBId?: Maybe<IntFilter>
    AND?: Maybe<Array<SubmissionScalarWhereInput>>
    OR?: Maybe<Array<SubmissionScalarWhereInput>>
    NOT?: Maybe<Array<SubmissionScalarWhereInput>>
}

export type SubmissionUpdateManyDataInput = {
    id?: Maybe<Scalars['Int']>
    createdAt?: Maybe<Scalars['DateTime']>
    updatedAt?: Maybe<Scalars['DateTime']>
    valid?: Maybe<Scalars['Boolean']>
    movieTitle?: Maybe<Scalars['String']>
    movieDBId?: Maybe<Scalars['Int']>
}

export type SubmissionUpsertWithWhereUniqueWithoutAuthorInput = {
    where: SubmissionWhereUniqueInput
    update: SubmissionUpdateWithoutAuthorDataInput
    create: SubmissionCreateWithoutAuthorInput
}

export type UserUpsertWithoutRengasInput = {
    update: UserUpdateWithoutRengasDataInput
    create: UserCreateWithoutRengasInput
}

export type RengaUpsertWithWhereUniqueWithoutPartyInput = {
    where: RengaWhereUniqueInput
    update: RengaUpdateWithoutPartyDataInput
    create: RengaCreateWithoutPartyInput
}

export type PartyUpsertWithoutUsersInput = {
    update: PartyUpdateWithoutUsersDataInput
    create: PartyCreateWithoutUsersInput
}

export type UserUpsertWithoutSubmissionInput = {
    update: UserUpdateWithoutSubmissionDataInput
    create: UserCreateWithoutSubmissionInput
}

export type SubmissionUpsertWithWhereUniqueWithoutRengaInput = {
    where: SubmissionWhereUniqueInput
    update: SubmissionUpdateWithoutRengaDataInput
    create: SubmissionCreateWithoutRengaInput
}

export type CreatePartyMutationVariables = {
    username: Scalars['String']
}

export type CreatePartyMutation = { __typename?: 'Mutation' } & Pick<
    Mutation,
    'createParty'
>

export type JoinPartyMutationVariables = {
    partyId: Scalars['String']
    username: Scalars['String']
}

export type JoinPartyMutation = { __typename?: 'Mutation' } & Pick<
    Mutation,
    'joinParty'
>

export type GetRengasQueryVariables = {
    partyId: Scalars['String']
}

export type GetRengasQuery = { __typename?: 'Query' } & {
    rengas: Array<
        { __typename?: 'Renga' } & Pick<
            Renga,
            'id' | 'emojis' | 'createdAt' | 'deletedAt'
        > & {
                author: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
                status: { __typename?: 'Status' } & Pick<
                    Status,
                    'isResolved' | 'isMine'
                >
            }
    >
}

export type GetPlayersQueryVariables = {
    partyId: Scalars['String']
    userId?: Maybe<Scalars['Int']>
}

export type GetPlayersQuery = { __typename?: 'Query' } & {
    user?: Maybe<
        { __typename?: 'User' } & Pick<
            User,
            'id' | 'postedCount' | 'solvedCount'
        >
    >
    party?: Maybe<
        { __typename?: 'Party' } & Pick<Party, 'id'> & {
                users: Array<
                    { __typename?: 'User' } & Pick<
                        User,
                        'id' | 'username' | 'score'
                    >
                >
            }
    >
}

export type CreateRengaMutationVariables = {
    authorId: Scalars['Int']
    partyId: Scalars['String']
    emojis: Array<Scalars['String']>
    movieId: Scalars['Int']
    movieTitle: Scalars['String']
    movieYear: Scalars['Int']
}

export type CreateRengaMutation = { __typename?: 'Mutation' } & {
    createOneRenga: { __typename?: 'Renga' } & Pick<Renga, 'id' | 'emojis'>
}

export type DeleteRengaMutationVariables = {
    rengaId: Scalars['Int']
    date: Scalars['DateTime']
}

export type DeleteRengaMutation = { __typename?: 'Mutation' } & {
    updateOneRenga?: Maybe<
        { __typename?: 'Renga' } & Pick<Renga, 'id' | 'deletedAt'>
    >
}

export type GetRengaQueryVariables = {
    rengaId: Scalars['Int']
}

export type GetRengaQuery = { __typename?: 'Query' } & {
    renga?: Maybe<
        { __typename?: 'Renga' } & Pick<
            Renga,
            'id' | 'emojis' | 'createdAt' | 'deletedAt'
        > & {
                status: { __typename?: 'Status' } & Pick<
                    Status,
                    'isResolved' | 'isMine' | 'maybeTitle'
                >
                author: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
                submissions: Array<
                    { __typename?: 'Submission' } & Pick<
                        Submission,
                        'id' | 'createdAt' | 'maybeTitle' | 'valid'
                    > & {
                            author: { __typename?: 'User' } & Pick<
                                User,
                                'id' | 'username'
                            >
                        }
                >
            }
    >
}

export type CreateSubmissionMutationVariables = {
    rengaId: Scalars['Int']
    movieTitle: Scalars['String']
    movieDBId: Scalars['Int']
}

export type CreateSubmissionMutation = { __typename?: 'Mutation' } & {
    createSubmission: { __typename?: 'Submission' } & Pick<
        Submission,
        'id' | 'valid'
    >
}

export const CreatePartyDocument = gql`
    mutation CreateParty($username: String!) {
        createParty(username: $username)
    }
`

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
export function useCreatePartyMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        CreatePartyMutation,
        CreatePartyMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        CreatePartyMutation,
        CreatePartyMutationVariables
    >(CreatePartyDocument, baseOptions)
}
export type CreatePartyMutationHookResult = ReturnType<
    typeof useCreatePartyMutation
>
export type CreatePartyMutationResult = ApolloReactCommon.MutationResult<
    CreatePartyMutation
>
export type CreatePartyMutationOptions = ApolloReactCommon.BaseMutationOptions<
    CreatePartyMutation,
    CreatePartyMutationVariables
>
export const JoinPartyDocument = gql`
    mutation joinParty($partyId: String!, $username: String!) {
        joinParty(partyId: $partyId, username: $username)
    }
`

/**
 * __useJoinPartyMutation__
 *
 * To run a mutation, you first call `useJoinPartyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinPartyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinPartyMutation, { data, loading, error }] = useJoinPartyMutation({
 *   variables: {
 *      partyId: // value for 'partyId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useJoinPartyMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        JoinPartyMutation,
        JoinPartyMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        JoinPartyMutation,
        JoinPartyMutationVariables
    >(JoinPartyDocument, baseOptions)
}
export type JoinPartyMutationHookResult = ReturnType<
    typeof useJoinPartyMutation
>
export type JoinPartyMutationResult = ApolloReactCommon.MutationResult<
    JoinPartyMutation
>
export type JoinPartyMutationOptions = ApolloReactCommon.BaseMutationOptions<
    JoinPartyMutation,
    JoinPartyMutationVariables
>
export const GetRengasDocument = gql`
    query GetRengas($partyId: String!) {
        rengas(
            where: { partyId: { equals: $partyId } }
            orderBy: { createdAt: desc }
        ) {
            id
            emojis
            author {
                id
                username
            }
            createdAt
            deletedAt
            status {
                isResolved
                isMine
            }
        }
    }
`

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
export function useGetRengasQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<
        GetRengasQuery,
        GetRengasQueryVariables
    >
) {
    return ApolloReactHooks.useQuery<GetRengasQuery, GetRengasQueryVariables>(
        GetRengasDocument,
        baseOptions
    )
}
export function useGetRengasLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetRengasQuery,
        GetRengasQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<
        GetRengasQuery,
        GetRengasQueryVariables
    >(GetRengasDocument, baseOptions)
}
export type GetRengasQueryHookResult = ReturnType<typeof useGetRengasQuery>
export type GetRengasLazyQueryHookResult = ReturnType<
    typeof useGetRengasLazyQuery
>
export type GetRengasQueryResult = ApolloReactCommon.QueryResult<
    GetRengasQuery,
    GetRengasQueryVariables
>
export const GetPlayersDocument = gql`
    query getPlayers($partyId: String!, $userId: Int) {
        user(where: { id: $userId }) {
            id
            postedCount
            solvedCount
        }
        party(where: { id: $partyId }) {
            id
            users(orderBy: { score: desc }) {
                id
                username
                score
            }
        }
    }
`

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
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPlayersQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<
        GetPlayersQuery,
        GetPlayersQueryVariables
    >
) {
    return ApolloReactHooks.useQuery<GetPlayersQuery, GetPlayersQueryVariables>(
        GetPlayersDocument,
        baseOptions
    )
}
export function useGetPlayersLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetPlayersQuery,
        GetPlayersQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<
        GetPlayersQuery,
        GetPlayersQueryVariables
    >(GetPlayersDocument, baseOptions)
}
export type GetPlayersQueryHookResult = ReturnType<typeof useGetPlayersQuery>
export type GetPlayersLazyQueryHookResult = ReturnType<
    typeof useGetPlayersLazyQuery
>
export type GetPlayersQueryResult = ApolloReactCommon.QueryResult<
    GetPlayersQuery,
    GetPlayersQueryVariables
>
export const CreateRengaDocument = gql`
    mutation createRenga(
        $authorId: Int!
        $partyId: String!
        $emojis: [String!]!
        $movieId: Int!
        $movieTitle: String!
        $movieYear: Int!
    ) {
        createOneRenga(
            data: {
                emojis: { set: $emojis }
                author: { connect: { id: $authorId } }
                party: { connect: { id: $partyId } }
                movie: {
                    create: {
                        movieDBId: $movieId
                        title: $movieTitle
                        year: $movieYear
                    }
                }
            }
        ) {
            id
            emojis
        }
    }
`

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
export function useCreateRengaMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        CreateRengaMutation,
        CreateRengaMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        CreateRengaMutation,
        CreateRengaMutationVariables
    >(CreateRengaDocument, baseOptions)
}
export type CreateRengaMutationHookResult = ReturnType<
    typeof useCreateRengaMutation
>
export type CreateRengaMutationResult = ApolloReactCommon.MutationResult<
    CreateRengaMutation
>
export type CreateRengaMutationOptions = ApolloReactCommon.BaseMutationOptions<
    CreateRengaMutation,
    CreateRengaMutationVariables
>
export const DeleteRengaDocument = gql`
    mutation deleteRenga($rengaId: Int!, $date: DateTime!) {
        updateOneRenga(data: { deletedAt: $date }, where: { id: $rengaId }) {
            id
            deletedAt
        }
    }
`

/**
 * __useDeleteRengaMutation__
 *
 * To run a mutation, you first call `useDeleteRengaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRengaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRengaMutation, { data, loading, error }] = useDeleteRengaMutation({
 *   variables: {
 *      rengaId: // value for 'rengaId'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useDeleteRengaMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        DeleteRengaMutation,
        DeleteRengaMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        DeleteRengaMutation,
        DeleteRengaMutationVariables
    >(DeleteRengaDocument, baseOptions)
}
export type DeleteRengaMutationHookResult = ReturnType<
    typeof useDeleteRengaMutation
>
export type DeleteRengaMutationResult = ApolloReactCommon.MutationResult<
    DeleteRengaMutation
>
export type DeleteRengaMutationOptions = ApolloReactCommon.BaseMutationOptions<
    DeleteRengaMutation,
    DeleteRengaMutationVariables
>
export const GetRengaDocument = gql`
    query getRenga($rengaId: Int!) {
        renga(where: { id: $rengaId }) {
            id
            emojis
            createdAt
            deletedAt
            status {
                isResolved
                isMine
                maybeTitle
            }
            author {
                id
                username
            }
            submissions(orderBy: { createdAt: desc }) {
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
`

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
export function useGetRengaQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<
        GetRengaQuery,
        GetRengaQueryVariables
    >
) {
    return ApolloReactHooks.useQuery<GetRengaQuery, GetRengaQueryVariables>(
        GetRengaDocument,
        baseOptions
    )
}
export function useGetRengaLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetRengaQuery,
        GetRengaQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<GetRengaQuery, GetRengaQueryVariables>(
        GetRengaDocument,
        baseOptions
    )
}
export type GetRengaQueryHookResult = ReturnType<typeof useGetRengaQuery>
export type GetRengaLazyQueryHookResult = ReturnType<
    typeof useGetRengaLazyQuery
>
export type GetRengaQueryResult = ApolloReactCommon.QueryResult<
    GetRengaQuery,
    GetRengaQueryVariables
>
export const CreateSubmissionDocument = gql`
    mutation createSubmission(
        $rengaId: Int!
        $movieTitle: String!
        $movieDBId: Int!
    ) {
        createSubmission(
            rengaId: $rengaId
            movieDBId: $movieDBId
            movieTitle: $movieTitle
        ) {
            id
            valid
        }
    }
`

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
export function useCreateSubmissionMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        CreateSubmissionMutation,
        CreateSubmissionMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        CreateSubmissionMutation,
        CreateSubmissionMutationVariables
    >(CreateSubmissionDocument, baseOptions)
}
export type CreateSubmissionMutationHookResult = ReturnType<
    typeof useCreateSubmissionMutation
>
export type CreateSubmissionMutationResult = ApolloReactCommon.MutationResult<
    CreateSubmissionMutation
>
export type CreateSubmissionMutationOptions = ApolloReactCommon.BaseMutationOptions<
    CreateSubmissionMutation,
    CreateSubmissionMutationVariables
>
