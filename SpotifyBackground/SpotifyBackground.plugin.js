/**
* @name         SpotifyBackground
* @description  Sets the spotify song cover as user card background.
* @donate       https://bit.ly/3fnzq1Z
* @source       https://github.com/rmkx/Plugins/tree/main/SpotifyBackground
* @author       rmkx
* @invite       HnGWVQbQBv
* @version      1.0
*/

const UserPopoutHeader = BdApi.findModule((m) => m?.default?.displayName === 'UserPopoutHeader');
const UserPopoutInfo = BdApi.findModule((m) => m?.default?.displayName === 'UserPopoutInfo');


const backgroundPatch = () => BdApi.Patcher.after('backgroundPatch', UserPopoutHeader, 'default', (that, args, value) => {
    const [props] = args;
    let spotifyBackground;
    if (props.activity && props.activity.name === "Spotify") {
        spotifyBackground = {
            className: "spotify-background",
            style: {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                filter: "brightness(0.4)",
                background: "url(https://i.scdn.co/image/" + props.activity.assets.large_image.substring(8, props.activity.assets.large_image.length) + ") center/cover no-repeat",
                zIndex: "0"
            }
        };
        if(!props.user.bannerURL) { spotifyBackground.style.top = "60px" }
        else { spotifyBackground.style.top = "120px" }
        value.props.children.splice(1, 0, BdApi.React.createElement("div", spotifyBackground));
    }
	return value;
});
const headerPatch = () => BdApi.Patcher.after('headerPatch', UserPopoutInfo, 'default', (that, args, value) => {
    const [props] = args;
    value.props.style = { background: "transparent", borderBottom: "none" };
    return value;
});

module.exports = class SpotifyBackground {
    load() { }

    start() {
        backgroundPatch();
        headerPatch();
    }
    stop() {
        BdApi.Patcher.unpatchAll('backgroundPatch');
        BdApi.Patcher.unpatchAll('headerPatch');
    }

    observer(changes) { }
}