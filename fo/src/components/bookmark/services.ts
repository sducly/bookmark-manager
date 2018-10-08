import * as moment from "moment";
import { BookmarkTypeEnum } from "../../schema";
import { IApiResult } from "./types";

/**
 * Return a photoID form a Flickr Url
 * @param url String
 */
const getPhotoID = (url: string) => {
    const matches = url.match(/(\d+)/g);
    if (matches && matches.length > 0) {
        return matches[0];
    }
    return null;
}

/**
 * Call a flickr method api and return the response
 * @param method string
 * @param photoID string
 */
const fetchFlickr = async (method: string, photoID: string) => {
    const result = await fetch("https://api.flickr.com/services/rest/?method=flickr.photos." + method + "&api_key=" + process.env.REACT_APP_FLICKR_API_KEY + "&format=json&nojsoncallback=1&photo_id=" + photoID);
    return result.json();
}

/**
 * Call Vimeo API to get video infos
 * @param url string
 */
const fetchVimeo = async (url: string) => {
    const result = await fetch("https://vimeo.com/api/oembed.json?url=" + url);
    return (result.status === 200) ? result.json() : null;
}

/**
 * Call a Private Vimeo Endpoint with Authorization. 
 */
const fetchVimeoAuth = async (endpoint: string, videoId: string) => {
    const result = await fetch('https://api.vimeo.com/videos/' + videoId + '/'+endpoint, {
        headers: new Headers({
            'Authorization': 'basic ' + btoa(process.env.REACT_APP_VIMEO_IDENTIFIER + ":" + process.env.REACT_APP_VIMEO_SECRET),
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        method: 'get'
    });

    return (result.status === 200) ? result.json() : null;
}

/**
 * Return all data needed from Flickr API
 * @param url string
 */
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
                return s.label === "Medium"
            });

            const tags = photo.tags.tag.map((t: any) => t.raw);
            return {
                addedDate: moment(photo.dates.taken).format('YYYY-MM-DD'),
                authorName: photo.owner.realname,
                height: lastSize.height,
                tags: tags.join(),
                thumbUrl: thumbSize.source,
                title: photo.title._content,
                type: BookmarkTypeEnum.PICTURE,
                url,
                width: lastSize.width,

            }
        }
    }
    return {
        addedDate: "",
        authorName: "",
        height: 0,
        tags: "",
        thumbUrl: "",
        title: "",
        type: BookmarkTypeEnum.VIDEO,
        url: "",
        width: 0
    };
}

/**
 * Return all data needed from VIMEO API
 */
export const getVideoInfo = async (url: string): Promise<IApiResult> => {
    const videoInfos = await fetchVimeo(url);

    if (videoInfos) {
        const tagsResult:any = await fetchVimeoAuth("tags", videoInfos.video_id);
        const tags = tagsResult.data.map((t: any) => t.name);

        return {
            addedDate: moment(videoInfos.upload_date).format('YYYY-MM-DD'),
            authorName: videoInfos.author_name,
            height: videoInfos.height,
            tags: tags.join(),
            thumbUrl: videoInfos.thumbnail_url,
            title: videoInfos.title,
            type: BookmarkTypeEnum.VIDEO,
            url,
            video: {
                duration: videoInfos.duration
            },
            width: videoInfos.width
        }
    }

    return {
        addedDate: "",
        authorName: "",
        height: 0,
        tags: "",
        thumbUrl: "",
        title: "",
        type: BookmarkTypeEnum.VIDEO,
        url: "",
        width: 0
    }

}