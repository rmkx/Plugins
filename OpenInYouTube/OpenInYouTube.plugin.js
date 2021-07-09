/**
* @name         OpenInYouTube
* @description  Allows you to search for Spotify songs in YouTube when clicking the song image.
* @donate       https://bit.ly/3fnzq1Z
* @source       https://github.com/rmkx/Plugins/OpenInYouTube
* @author       rmkx
* @invite       HnGWVQbQBv
* @version      1.0
*/

module.exports = class OpenInYoutube {
    getName() { return "Open in YouTube"; }
    load() {
    }
    start() {
        activityPatch();
    }
    stop() {
        BdApi.Patcher.unpatchAll("OpenInYoutube");
    }
    observer(changes) {
    }
}

const UserActivity = BdApi.findModuleByDisplayName("UserActivity");
const activityPatch = () => BdApi.Patcher.after("OpenInYoutube", UserActivity.prototype, "render", (that, args, value) => {
    const instance = that;
    const [props] = args;
    console.log("Instance: ", instance, "\nProps: ", props, "\nValue: ", value);
    /*if (instance.props.activity && instance.props.activity.name === "Spotify") {
        const image = value.props.children[1].props.children[0].props;
        image.onClick = () => {
            let songName = instance.props.activity.details.replace(/\s/g, "+");
            let songArtist = "+" + instance.props.activity.state.replace(/\s/g, "+").replace(/;/g, "");
            let url = "https://www.youtube.com/results?search_query=" + songName + songArtist;
            window.open(url, '_blank');
        }
    }*/
    return value;
});