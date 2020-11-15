function timestamp_to_string(timestamp)
{
    const date_obj = new Date(timestamp);
    const min = `${date_obj.getMinutes()}`.length===1 ? `0${date_obj.getMinutes()}` : `${date_obj.getMinutes()}`;
    const date_str = `${date_obj.getDate()}/${date_obj.getMonth()+1}/${date_obj.getFullYear()} ${date_obj.getHours()}:${min}`;
    return date_str;
}

export default timestamp_to_string;