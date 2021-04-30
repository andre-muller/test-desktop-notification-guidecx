import { useState } from "react";
import Notification from "react-web-notification";
import "./App.css";

function App() {
  const [ignore, setIgnore] = useState(true);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState({});

  function handlePermissionGranted() {
    console.log("Permission Granted");
    setIgnore(false);
  }
  function handlePermissionDenied() {
    console.log("Permission Denied");

    setIgnore(true);
  }
  function handleNotSupported() {
    console.log("Web Notification not Supported");

    setIgnore(true);
  }

  function handleNotificationOnClick(e, tag) {
    console.log(e, "Notification clicked tag:" + tag);
  }

  function handleNotificationOnError(e, tag) {
    console.log(e, "Notification error tag:" + tag);
  }

  function handleNotificationOnClose(e, tag) {
    console.log(e, "Notification closed tag:" + tag);
  }

  function handleNotificationOnShow(e, tag) {
    playSound();
    console.log(e, "Notification shown tag:" + tag);
  }

  function playSound() {
    document.getElementById("sound").play();
  }

  function handleButtonClick() {
    if (ignore) {
      return;
    }

    const now = Date.now();

    const tmpTitle = "Title Notification";
    const body = "Guidecx notification" + new Date();
    const tag = now;
    const icon =
      "https://www.guidecx.com/wp-content/uploads/2021/01/cropped-guidecx-logo-192x192.png";
    // const icon = 'http://localhost:3000/Notifications_button_24.png';

    // Available options
    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    const tmpOptions = {
      tag: tag,
      body: body,
      icon: icon,
      lang: "en",
      dir: "ltr",
      sound: "./sound.mp3", // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
    };

    setOptions(tmpOptions);
    setTitle(tmpTitle);
  }

  return (
    <div className="App">
      <button onClick={handleButtonClick.bind(this)}>Notify!</button>
      <Notification
        ignore={ignore && title !== ""}
        notSupported={handleNotSupported.bind(this)}
        onPermissionGranted={handlePermissionGranted.bind(this)}
        onPermissionDenied={handlePermissionDenied.bind(this)}
        onShow={handleNotificationOnShow.bind(this)}
        onClick={handleNotificationOnClick.bind(this)}
        onClose={handleNotificationOnClose.bind(this)}
        onError={handleNotificationOnError.bind(this)}
        timeout={5000}
        title={title}
        options={options}
      />
      <audio id="sound" preload="auto">
        <source src="./sound.mp3" type="audio/mpeg" />
        <source src="./sound.ogg" type="audio/ogg" />
        <embed hidden={true} autostart="false" loop={false} src="./sound.mp3" />
      </audio>
    </div>
  );
}

export default App;
