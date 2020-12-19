// Global
const HOME = "/";
// Videos
const VIDEOS = "/videos";
const VIDEO_DETAIL = "/:id";

const routes = {
    home: HOME,
    videos: VIDEOS,
    videoDetail: (id) => {
        if (id) {
            return `${id}`;
        } else {
            return VIDEO_DETAIL
        }
    }
};

export default routes;
