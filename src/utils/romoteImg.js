/*
 * @Author: your name
 * @Date: 2020-06-05 14:13:39
 * @LastEditTime: 2020-06-05 14:55:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wash-car\src\utils\romoteImg.js
 */
import EXIF from 'exif-js'
// base64转file
function dataURLtoFile (dataurl, filename) { // 将base64转换为文件
  var arr = dataurl.split(','); var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// 旋转图片到正常
const rotateImg = (imgFile) => {
  return new Promise((resolve, reject) => {
    EXIF.getData(imgFile, function () {
      const exifTags = EXIF.getAllTags(this)
      console.log('exifTags', exifTags)
      const reader = new FileReader()
      reader.readAsDataURL(imgFile)
      reader.onload = e => {
        const imgData = e.target.result
        // 8 表示 顺时针转了90
        // 3 表示 转了 180
        // 6 表示 逆时针转了90
        if (
          exifTags.Orientation === 8 ||
          exifTags.Orientation === 3 ||
          exifTags.Orientation === 6
        ) {
          // 翻转
          // 获取原始图片大小
          const img = new Image()
          img.src = imgData
          img.onload = function () {
            const cvs = document.createElement('canvas')
            const ctx = cvs.getContext('2d')
            // 如果旋转90
            if (
              exifTags.Orientation === 8 ||
              exifTags.Orientation === 6
            ) {
              cvs.width = img.height
              cvs.height = img.width
            } else {
              cvs.width = img.width
              cvs.height = img.height
            }
            if (exifTags.Orientation === 6) {
              // 原图逆时针转了90, 所以要顺时针旋转90
              ctx.rotate(Math.PI / 180 * 90)
              ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                0,
                -img.height,
                img.width,
                img.height
              )
            }
            if (exifTags.Orientation === 3) {
              // 原图逆时针转了180, 所以顺时针旋转180
              ctx.rotate(Math.PI / 180 * 180)
              ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                -img.width,
                -img.height,
                img.width,
                img.height
              )
            }
            if (exifTags.Orientation === 8) {
              // 原图顺时针旋转了90, 所以要你时针旋转90
              ctx.rotate(Math.PI / 180 * -90)
              ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                -img.width,
                0,
                img.width,
                img.height
              )
            }
            const data = dataURLtoFile(cvs.toDataURL('image/png'), imgFile.name)
            resolve(data)
          }
        } else {
          resolve(imgFile)
        }
      }
    })
  })
}

export default rotateImg
