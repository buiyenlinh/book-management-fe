export default function UseFunction() {
  const createAlias = (str: string) => {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"    
    ];
    for (let i=0; i<AccentsMap.length; i++) {
      let re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      let char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    str = str.trim();
    str = str.replace(/\s+/g, '-').toLowerCase();
    str = str.replace(/[[]&#,+()$~%.'":*?<>{}]/g, '');
    return str;
  }

  return {
    createAlias
  }
}