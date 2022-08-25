let $ = document.querySelector


const peer = new Peer();
let currentCall;
peer.on('open', (id) => {
    $('#uuid').textContext = id
})

async function callUser() {
    const peerId = document.querySelector('input').value
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    })
    $('#menu').style.display = 'none'
    $('#live').style.display = 'none'
    $('#local-video').srcObject = stream
    $('#local-video').play()
    const call = peer.call(peerId, stream)
    call.on('stream', stream => {
        $('#remote-video').srcObject = stream
        $('#remote-video').play()
    })
    call.on('data', stream => {
        $('#remote-video').srcObject = stream
    })
    call.on('error', error => {
        console.log(error)
    })
    call.on('close', () => {
        endCall()
    })
    currentCall = call
}

peer.on("call", (call) => {
    if (confirm(`Accept call from ${call.peer}?`)) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          document.querySelector("#local-video").srcObject = stream;
          document.querySelector("#local-video").play();
          call.answer(stream);
          currentCall = call;
          document.querySelector("#menu").style.display = "none";
          document.querySelector("#live").style.display = "block";
          call.on("stream", (remoteStream) => {
            document.getElementById("remote-video").srcObject = remoteStream;
            document.getElementById("remote-video").play();
          });
        })
        .catch((err) => {
          console.log("Failed to get local stream:", err);
        });
    } else {
      call.close();
    }
});

function endCall() {
    document.querySelector("#menu").style.display = "block";
    document.querySelector("#live").style.display = "none";
    if (!currentCall) return;
    try {
      currentCall.close();
    } catch {}
    currentCall = undefined;
}
 