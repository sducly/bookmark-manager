import * as moment from "moment";
import { BookmarkTypeEnum } from "../../schema";
import { IApiResult } from "./types";

const getPhotoID = (url: string) => {
    const matches = url.match(/(\d+)/g);
    if (matches && matches.length > 0) {
        return matches[0];
    }
    return null;
}

const fetchFlickr = async (method: string, photoID: string) => {
    const result = await fetch("https://api.flickr.com/services/rest/?method=flickr.photos." + method + "&api_key=" + process.env.REACT_APP_FLICKR_API_KEY + "&format=json&nojsoncallback=1&photo_id=" + photoID);
    return result.json();
}

const fetchVimeo = async (url: string) => {
    const result = await fetch("https://vimeo.com/api/oembed.json?url=" + url);
    return (result.status === 200) ? result.json() : null;
}

export const getPicturesInfo = async (url: string): Promise<IApiResult> => {
    const photoID = getPhotoID(url);
    if (photoID) {
        const photosInfos = await fetchFlickr("getInfo", photoID);
        const photoSizes = await fetchFlickr('getSizes', photoID);

        const { photo } = photosInfos;
        const { sizes } = photoSizes;

        if (photo && sizes) {

            const lastSize = sizes.size.slice(-1)[0];
            const thumbSize = sizes.size.find((s: any) => {
                return s.label === "Thumbnail"
            });

            return {
                addedDate: moment(photo.dates.taken).format('YYYY-MM-DD'),
                authorName: photo.owner.realname,
                height: lastSize.height,
                thumbUrl: thumbSize.source,
                title: photo.title._content,
                type: BookmarkTypeEnum.PICTURE,
                url,
                width: lastSize.width
            }
        }
    }
    return  {
        addedDate: "",
        authorName: "",
        height: 0,
        thumbUrl: "",
        title: "",
        type: BookmarkTypeEnum.VIDEO,
        url: "",
        width: 0
    };
}

export const getVideoInfo = async (url: string): Promise<IApiResult> => {
    const videoInfos = await fetchVimeo(url);

    if (videoInfos) {
        // tslint:disable-next-line:no-console
        console.log(videoInfos);
        return {
            addedDate: moment(videoInfos.upload_date).format('YYYY-MM-DD'),
            authorName: videoInfos.author_name,
            height: videoInfos.height,
            thumbUrl: videoInfos.thumbnail_url,
            title: videoInfos.title,
            type: BookmarkTypeEnum.VIDEO,
            url,
            width: videoInfos.width
        }
    }

    return  {
        addedDate: "",
        authorName: "",
        height: 0,
        thumbUrl: "",
        title: "",
        type: BookmarkTypeEnum.VIDEO,
        url: "",
        width: 0
    }

}