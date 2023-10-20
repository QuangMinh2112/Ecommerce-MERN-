import icons from "./icons";

const { AiFillStar, AiOutlineStar } = icons;
export const formatPrice = (number) =>
  Number(number?.toFixed(1)).toLocaleString();

export const ratingStar = (number, size) => {
  if (!Number(number)) return;
  const star = [];
  number = Math.round(number);
  for (let i = 0; i < +number; i++) {
    star.push(<AiFillStar color="orange" size={size || 16} />);
  }
  for (let i = 5; i > +number; i--) {
    star.push(<AiOutlineStar color="orange" size={size || 16} />);
  }
  return star;
};
//Hàm viết hoa chữ cái đầu tiên
export function capitalize_Words(str) {
  return str?.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
export const formatCoundown = (d) => {
  d = Number(d) / 1000;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
};

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;

  const formatPayload = Object.entries(payload);

  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], message: "Required this field" },
      ]);
    }
  }
  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email":
        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!arr[1].toLowerCase().match(regex)) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], message: "Email invalidate !" },
          ]);
        }
        break;
      case "password":
        if (arr[1].length < 6) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              message: "Password must be at least 6 characters !",
            },
          ]);
        }
        break;
      default:
        break;
    }
  }
  return invalids;
};

export const generateRange = (start, end) => {
  let length = end + 1 - start;

  return Array.from({ length }, (_, id) => id + start);
};

export function getBase64(file) {
  if (!file) return;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function isEmpty(str) {
  if (!str) return;
  if (str.length === 0) return false;
  if (str.length > 0) return true;
}
export const isVietnamesePhoneNumberValid = (phone) => {
  return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(phone);
};
// Limited words
export const checkLengthBiographyArtists = (str, number) => {
  if (str?.length > 295) {
    return `${str.slice(0, number)} ...`;
  } else {
    return str;
  }
};
