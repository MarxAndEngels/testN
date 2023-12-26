import {DocumentNode} from "graphql/language";
import {offersGql, OffersInputType, OffersTypeData} from "~/apollo/queries/offer/offers";
import {offerGql, OfferPageDataType, OfferPageInputType} from "~/apollo/queries/offer/offer";
import {filterGql, OfferFiltersInputType, OfferFiltersDataType} from "~/apollo/queries/offer/filters";
import {countGql, CountInputType, CountTypeData} from "~/apollo/queries/offer/count";
import {FolderDataType, foldersGql, FoldersInput} from "~/apollo/queries/new/folders";
import {FolderPageInput, folderGql, FolderPageDataType} from "~/apollo/queries/new/folder";
import {NewOffersInputType, NewOffersDataType, newOffersGql} from "~/apollo/queries/new/newOffers";
import {NewOfferPageDataType, NewOfferPageInputType, newOfferPageGql} from "~/apollo/queries/new/newOffer";
import {sendNewFeedbackGql, SendNewFeedback, SendNewFeedbackData} from "~/apollo/mutations/newFeedback";
import {filterNewGql, OfferFilterNewDataType, OfferFilterNewInputType} from "~/apollo/queries/new/filters";
import {useSiteConfig} from "~/store/siteConfig";

export const request = async <Response, Request = undefined>(query: DocumentNode, variables?: Request, isLazy?: boolean, cache: boolean = true) => {
    let siteId = useSiteConfig().site.id
    let assignVariables = {
        site_id: siteId
    }
    let params = {...assignVariables, ...variables}
    let removeEmptyParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null));

    return isLazy ? useLazyAsyncQuery<Response>({
        query,
        variables: removeEmptyParams,
        cache
    }) : useAsyncQuery<Response>({query, variables: removeEmptyParams})
}
export const postRequest = async <Response, Request = undefined>(query: DocumentNode, variables?: Request) => {
    let siteId = null
    let assignVariables = {
        site_id: useSiteConfig().site.id
    }
    let params = {...assignVariables, ...variables}
    let removeEmptyParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null))
    return useMutation<Response>(query, {variables: removeEmptyParams});
}


export const requestOffers = async (variables: OffersInputType) => {
    return await request<OffersTypeData, OffersInputType>(offersGql, variables, false)
}
export const requestNewOffers = async (variables: NewOffersInputType) => {
    return await request<NewOffersDataType, NewOffersInputType>(newOffersGql, variables, true)
}
export const requestOffer = async (variables: OfferPageInputType) => {
    return await request<OfferPageDataType, OfferPageInputType>(offerGql, variables, false)
}
export const requestNewOffer = async (variables: NewOfferPageInputType) => {
    return await request<NewOfferPageDataType, NewOfferPageInputType>(newOfferPageGql, variables, true)
}
export const requestFilters = async (variables: OfferFiltersInputType) => {
    return await request<OfferFiltersDataType, OfferFiltersInputType>(filterGql, variables, false)
}
export const requestNewFilters = async (variables: OfferFilterNewInputType) => {
    return await request<OfferFilterNewDataType, OfferFilterNewInputType>(filterNewGql, variables, true)
}
export const requestFiltersCount = async (variables: CountInputType) => {
    return await request<CountTypeData, CountInputType>(countGql, variables, false)
}
export const requestCatalogFolders = async (variables: FoldersInput) => {
    return await request<FolderDataType, FoldersInput>(foldersGql, variables, true)
}
export const requestCatalogFolder = async (variables: FolderPageInput) => {
    return await request<FolderPageDataType, FolderPageInput>(folderGql, variables, true, true)
}
export const sendNewFeedback = async (variables: SendNewFeedback) => {
    return await postRequest<SendNewFeedbackData, SendNewFeedback>(sendNewFeedbackGql, variables)
}