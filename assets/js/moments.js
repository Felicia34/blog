// 朋友圈页面的交互功能
function addMoment() {
    const momentInput = document.getElementById('moment-input');
    const imageInput = document.getElementById('image-input');
    const momentsList = document.getElementById('moments-list');

    if (momentInput.value.trim() !== "" || imageInput.files.length > 0) {
        const newMoment = document.createElement('div');
        newMoment.classList.add('moment');

        // 添加文本内容
        if (momentInput.value.trim() !== "") {
            const textContent = document.createElement('p');
            textContent.textContent = momentInput.value;
            newMoment.appendChild(textContent);
        }

        // 添加图片内容
        if (imageInput.files.length > 0) {
            const image = document.createElement('img');
            image.src = URL.createObjectURL(imageInput.files[0]);
            image.classList.add('moment-image');
            newMoment.appendChild(image);
        }

        // 添加点赞按钮
        const likeButton = document.createElement('button');
        likeButton.textContent = '👍 点赞';
        likeButton.onclick = function () {
            const likesCount = likeButton.dataset.likes ? parseInt(likeButton.dataset.likes) : 0;
            likeButton.dataset.likes = likesCount + 1;
            likeButton.textContent = `👍 点赞 (${likeButton.dataset.likes})`;
        };
        newMoment.appendChild(likeButton);

        momentsList.prepend(newMoment);

        // 清空输入框
        momentInput.value = "";
        imageInput.value = "";

        // 保存到本地存储
        saveMoments();
    }
}

// 保存到本地存储
function saveMoments() {
    const momentsList = document.getElementById('moments-list');
    localStorage.setItem('moments', momentsList.innerHTML);
}

// 加载本地存储的朋友圈内容
function loadMoments() {
    const momentsList = document.getElementById('moments-list');
    const savedMoments = localStorage.getItem('moments');
    if (savedMoments) {
        momentsList.innerHTML = savedMoments;
    }
}

// 页面加载时加载保存的朋友圈内容
document.addEventListener('DOMContentLoaded', loadMoments);