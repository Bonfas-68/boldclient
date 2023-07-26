export const domain = 'http://localhost:5000/api'
export const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validTypes.indexOf(file.type) === -1) {
      alert('File format is incorrect use .jpeg, .png or .jpg')
    } else if (file.size > 1024 * 1024 * 5) {
      alert('File size is too large')
    } else {
      return true;
    }
  }