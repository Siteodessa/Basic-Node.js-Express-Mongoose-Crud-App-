const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema
({
    title: {
              type: String,
              minlength: [6, 'Слишком короткий заголовок'],
              maxlength: [60, 'Слишком длинный заголовок']},
    home_title: String,
    page_link: {
              type: String,
              minlength: [3, 'Слишком короткая ссылка'],
              maxlength: [60, 'Слишком длинная ссылка']},
    home_background : String,
    breadcrumbs : Array,
    main_nav_list : String,
    phone : String,
    logo : String,
    address: { type: String, default: 'Одесса'},
    map_iframe : String,
    listing_title : String,
    listing_text : String,
    room_tags : String,
    listing_price_col : String,
    listing_slider : String,
    listing_details : String,
    description : String,
    additional_details : String,
    additional_details_block : String,
    listing_video : String,
    map_heading : String,
    subscribe : String,
    weekly_offer : String,
    footer_social : String,
    footer_about : String,
    useful_links : String,
    footer_col_title : String,
    contact_info : String,
    notes : String,
    dbtest : String,
    listing_details_iconblock: Array,
    useful_links_menu_list: String,
    floors_quant: { type: String, enum:["1", "2", "3", "4","5","6","7","8","9","10"] },
    sections_quant: { type: String, enum:["1", "2", "3", "4","5","6","7","8","9","10"] },
    appart_on_floor_quant: { type: String, enum:["1", "2", "3", "4","5","6","7","8","9","10"] },
    construction_type: { type: String, enum:["Монолитный каркас", "Кирпичный монолит", "Каркасно-каменный", "Панельный"] },
    frontend_material: { type: String, default: 'Штукатурка',enum:["Штукатурка", "Сайдинг", "Декоративная штукатурка",] },
    walls: { type: String, enum:["Газобетон 20 см", "Газобетон 40 см", "Газобетон 60 см", "Газобетон 40 см / Газобетон 20 см"], default: 'Газобетон 40 см / Газобетон 20 см' },
    windows: { type: String, enum:["Евробрус", "ПВХ"], default: 'Евробрус' },
    floor_height: { type: String, enum:["2.2", "2.4", "2.6", "2.8","3","3.2","3.4","3.6"], default: '3' },
    warming: { type: String, enum:["Котельная на крыше", "Котельная  подвале"], default: 'Котельная на крыше' },
    elevator: { type: String, enum:["Пассажирский", "Грузовой", "Пассажирский / Грузовой"] ,default: 'Пассажирский / Грузовой' },
    parking: { type: String, enum:["Подземный", "Наземный", "Наземный + Подземный"] , default: 'Наземный' },
    bldr: { type: String, default: 'Будова' , enum:["Будова"] },
    block: { type: String, default: 'Приморский', enum:["Приморский", "Киевский", "Суворовский", "Малиновский"] },
    content: {
              type: String,
              minlength: [4, 'Короткое тело описания'],
              maxlength: [5000, 'Слишком много длинное описание, ']},
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);
