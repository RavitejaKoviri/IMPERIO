--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: addressnumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.addressnumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.addressnumber OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    id integer DEFAULT nextval('public.addressnumber'::regclass),
    addressid character varying(225) GENERATED ALWAYS AS (('ABFRV'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    userid character varying(225) NOT NULL,
    city character varying(225) NOT NULL,
    street character varying(225) NOT NULL,
    statename character varying(225) NOT NULL,
    country character varying(225) NOT NULL,
    mobilenumber bigint NOT NULL,
    pincode bigint NOT NULL,
    addeddate date NOT NULL,
    addedtime time without time zone NOT NULL,
    addedday character varying(225) NOT NULL,
    name character varying(255)
);


ALTER TABLE public.address OWNER TO postgres;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    adminid character varying(255) NOT NULL,
    adminname character varying(255) NOT NULL,
    adminmail character varying(255) NOT NULL,
    adminmobile bigint NOT NULL,
    adminpassword character varying(255) NOT NULL
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: cardnumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cardnumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cardnumber OWNER TO postgres;

--
-- Name: cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cards (
    id integer DEFAULT nextval('public.cardnumber'::regclass),
    cardid character varying(225) GENERATED ALWAYS AS (('ABFCD'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    userid character varying(225) NOT NULL,
    cardnumber character varying(225) NOT NULL,
    cardholder character varying(225) NOT NULL,
    cardexpiry character varying(225) NOT NULL,
    cardcvv character varying(225) NOT NULL
);


ALTER TABLE public.cards OWNER TO postgres;

--
-- Name: cartnumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cartnumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cartnumber OWNER TO postgres;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    id integer DEFAULT nextval('public.cartnumber'::regclass),
    cartid character varying(225) GENERATED ALWAYS AS (('ABFCT'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    productid character varying(225) NOT NULL,
    userid character varying(225) NOT NULL,
    quantity bigint NOT NULL,
    remaining_quantity bigint NOT NULL,
    addeddate date NOT NULL,
    addedtime time without time zone NOT NULL,
    addedday character varying(225) NOT NULL
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- Name: categorynumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorynumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorynumber OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer DEFAULT nextval('public.categorynumber'::regclass),
    categoryid character varying(225) GENERATED ALWAYS AS (('ABFCG'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    categoryname character varying(225) NOT NULL,
    addeddate date NOT NULL,
    addedtime time without time zone NOT NULL,
    addedday character varying(225) NOT NULL,
    status character varying(225) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: colorsnumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colorsnumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colorsnumber OWNER TO postgres;

--
-- Name: colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colors (
    id integer DEFAULT nextval('public.colorsnumber'::regclass),
    colorid character varying(225) GENERATED ALWAYS AS (('ABFC'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    colorname character varying(225) NOT NULL,
    colorcode character varying(225) NOT NULL
);


ALTER TABLE public.colors OWNER TO postgres;

--
-- Name: imagenumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.imagenumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.imagenumber OWNER TO postgres;

--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer DEFAULT nextval('public.imagenumber'::regclass),
    imageid character varying(225) GENERATED ALWAYS AS (('ABFIM'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    productid character varying(225) NOT NULL,
    imgurl1 character varying(225) NOT NULL,
    imgurl2 character varying(225),
    imgurl3 character varying(225),
    imgurl4 character varying(225),
    imgurl5 character varying(225),
    imgurl6 character varying(225)
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: inventorynumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventorynumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventorynumber OWNER TO postgres;

--
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory (
    id integer DEFAULT nextval('public.inventorynumber'::regclass),
    inventoryid character varying(225) GENERATED ALWAYS AS (('ABFI'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    productid character varying(225) NOT NULL,
    invoiceid character varying(225) NOT NULL,
    quantity bigint NOT NULL,
    remaining_quantity bigint NOT NULL,
    addeddate date NOT NULL,
    addedtime time without time zone NOT NULL,
    addedday character varying(225) NOT NULL
);


ALTER TABLE public.inventory OWNER TO postgres;

--
-- Name: inventoryy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventoryy (
    inventory_id integer NOT NULL,
    product_id character varying(50),
    color character varying(50),
    selling_price numeric(10,2),
    purchase_price numeric(10,2),
    margin numeric(10,2) GENERATED ALWAYS AS ((selling_price - purchase_price)) STORED,
    total_cost numeric(10,2),
    date date,
    status character varying(50),
    "time" time without time zone,
    remaining_qty integer
);


ALTER TABLE public.inventoryy OWNER TO postgres;

--
-- Name: inventoryy_inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventoryy_inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventoryy_inventory_id_seq OWNER TO postgres;

--
-- Name: inventoryy_inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventoryy_inventory_id_seq OWNED BY public.inventoryy.inventory_id;


--
-- Name: invoicedetailnumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.invoicedetailnumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.invoicedetailnumber OWNER TO postgres;

--
-- Name: invoice_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoice_details (
    id integer DEFAULT nextval('public.invoicedetailnumber'::regclass),
    invoicedetailsid character varying(225) GENERATED ALWAYS AS (('ABFID'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    productid character varying(225) NOT NULL,
    invoiceid character varying(225) NOT NULL,
    quantity bigint NOT NULL,
    addeddate date NOT NULL,
    addedtime time without time zone NOT NULL,
    addedday character varying(225) NOT NULL
);


ALTER TABLE public.invoice_details OWNER TO postgres;

--
-- Name: invoicenumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.invoicenumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.invoicenumber OWNER TO postgres;

--
-- Name: invoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoices (
    id integer DEFAULT nextval('public.invoicenumber'::regclass),
    invoiceid character varying(225) GENERATED ALWAYS AS (('ABFI'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    invoicenumber bigint NOT NULL,
    invoiceimage character varying(225) NOT NULL
);


ALTER TABLE public.invoices OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    user_id character varying(50),
    product_id character varying(50),
    order_date date,
    mode_of_payment character varying(50),
    qty integer,
    price numeric(10,2),
    tax numeric(10,2),
    order_time time without time zone,
    expected_delivery date
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: otpidnumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.otpidnumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.otpidnumber OWNER TO postgres;

--
-- Name: otp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otp (
    id integer DEFAULT nextval('public.otpidnumber'::regclass),
    otpid character varying(225) GENERATED ALWAYS AS (('ABFO'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    otpnumber integer NOT NULL,
    userid character varying(255) NOT NULL
);


ALTER TABLE public.otp OWNER TO postgres;

--
-- Name: product_order_tracking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_order_tracking (
    tracking_id integer NOT NULL,
    order_id integer,
    inventory_id integer,
    product_id character varying(50),
    qty integer,
    remaining_qty integer,
    status character varying(50),
    tracking_date date,
    tracking_time time without time zone
);


ALTER TABLE public.product_order_tracking OWNER TO postgres;

--
-- Name: product_order_tracking_tracking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_order_tracking_tracking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_order_tracking_tracking_id_seq OWNER TO postgres;

--
-- Name: product_order_tracking_tracking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_order_tracking_tracking_id_seq OWNED BY public.product_order_tracking.tracking_id;


--
-- Name: product_specification; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_specification
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_specification OWNER TO postgres;

--
-- Name: productsnumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productsnumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productsnumber OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer DEFAULT nextval('public.productsnumber'::regclass),
    productid character varying(225) GENERATED ALWAYS AS (('ABFP'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    productname character varying(225) NOT NULL,
    categoryid character varying(225) NOT NULL,
    subcategoryid character varying(225) NOT NULL,
    originalprice bigint NOT NULL,
    currentprice bigint NOT NULL,
    discount bigint NOT NULL,
    description character varying(225) NOT NULL,
    specification character varying(225) NOT NULL,
    addeddate date NOT NULL,
    addedtime time without time zone NOT NULL,
    addedday character varying(225) NOT NULL,
    status character varying(255)
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: productsizecolornumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productsizecolornumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productsizecolornumber OWNER TO postgres;

--
-- Name: productsizecolors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productsizecolors (
    id integer DEFAULT nextval('public.productsizecolornumber'::regclass),
    productsizecolorid character varying(225) GENERATED ALWAYS AS (('ABFPSC'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    productid character varying(225) NOT NULL,
    colorid character varying(225) NOT NULL
);


ALTER TABLE public.productsizecolors OWNER TO postgres;

--
-- Name: ratingsnumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ratingsnumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ratingsnumber OWNER TO postgres;

--
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    id integer DEFAULT nextval('public.ratingsnumber'::regclass),
    ratingid character varying(225) GENERATED ALWAYS AS (('ABFR'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    productid character varying(225) NOT NULL,
    overallrating bigint NOT NULL,
    addeddate date NOT NULL,
    addedtime time without time zone NOT NULL,
    addedday character varying(225) NOT NULL
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- Name: reviewnumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviewnumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviewnumber OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer DEFAULT nextval('public.reviewnumber'::regclass),
    reviewid character varying(225) GENERATED ALWAYS AS (('ABFRV'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    userid character varying(225) NOT NULL,
    productid character varying(225) NOT NULL,
    reviewcomment character varying(225) NOT NULL,
    addeddate date NOT NULL,
    addedtime time without time zone NOT NULL,
    addedday character varying(225) NOT NULL,
    rating integer
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: sizesnumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sizesnumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sizesnumber OWNER TO postgres;

--
-- Name: sizes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sizes (
    id integer DEFAULT nextval('public.sizesnumber'::regclass),
    sizeid character varying(225) GENERATED ALWAYS AS (('ABFSZ'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    sizename character varying(225) NOT NULL
);


ALTER TABLE public.sizes OWNER TO postgres;

--
-- Name: specification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.specification (
    id integer DEFAULT nextval('public.product_specification'::regclass),
    product_specificationid character varying(225) GENERATED ALWAYS AS (('ABFPS'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    productid character varying(225) NOT NULL,
    specification_name character varying(225) NOT NULL,
    specification_value character varying(225) NOT NULL
);


ALTER TABLE public.specification OWNER TO postgres;

--
-- Name: subcategorynumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subcategorynumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subcategorynumber OWNER TO postgres;

--
-- Name: subcategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subcategories (
    id integer DEFAULT nextval('public.subcategorynumber'::regclass),
    subcategoryid character varying(225) GENERATED ALWAYS AS (('ABFSC'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    subcategoryname character varying(225) NOT NULL,
    addeddate date NOT NULL,
    addedtime time without time zone NOT NULL,
    addedday character varying(225) NOT NULL,
    status character varying(225) NOT NULL,
    categoryid character varying(225) NOT NULL
);


ALTER TABLE public.subcategories OWNER TO postgres;

--
-- Name: usercontactid; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usercontactid
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usercontactid OWNER TO postgres;

--
-- Name: usercontactdetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usercontactdetails (
    id integer DEFAULT nextval('public.usercontactid'::regclass),
    contactid character varying(225) GENERATED ALWAYS AS (('ABF'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    first_name character varying(225) NOT NULL,
    last_name character varying(225) NOT NULL,
    email character varying(225) NOT NULL,
    mobile bigint NOT NULL
);


ALTER TABLE public.usercontactdetails OWNER TO postgres;

--
-- Name: usernumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usernumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usernumber OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.usernumber'::regclass),
    userid character varying(225) GENERATED ALWAYS AS (('ABFU'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    firstname character varying(225) NOT NULL,
    lastname character varying(225) NOT NULL,
    email character varying(225),
    phonenumber bigint NOT NULL,
    password character varying(225) NOT NULL,
    status character varying(225) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: wishlistnumber; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.wishlistnumber
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.wishlistnumber OWNER TO postgres;

--
-- Name: wishlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wishlist (
    id integer DEFAULT nextval('public.wishlistnumber'::regclass),
    wishlistid character varying(225) GENERATED ALWAYS AS (('ABFW'::text || lpad((id)::text, 4, '0'::text))) STORED NOT NULL,
    productid character varying(225) NOT NULL,
    userid character varying(225) NOT NULL,
    quantity bigint NOT NULL,
    remaining_quantity bigint NOT NULL,
    addeddate date NOT NULL,
    addedtime time without time zone NOT NULL,
    addedday character varying(225) NOT NULL
);


ALTER TABLE public.wishlist OWNER TO postgres;

--
-- Name: inventoryy inventory_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventoryy ALTER COLUMN inventory_id SET DEFAULT nextval('public.inventoryy_inventory_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: product_order_tracking tracking_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_order_tracking ALTER COLUMN tracking_id SET DEFAULT nextval('public.product_order_tracking_tracking_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.address (id, userid, city, street, statename, country, mobilenumber, pincode, addeddate, addedtime, addedday, name) FROM stdin;
2	ABFU0001	Nandyal	umapathinagar	andhra	india	8309053400	58909	2024-08-10	17:38:11	Saturday	Jayasree Kanamarlapoodi
3	ABFU0001	Sylhet	321, Subid Bazaar	Sylhet	Bangladesh	1789123456	4336	2024-08-10	17:40:12	Saturday	UI Libfh
2	ABFU0001	Nandyal	umapathinagar	andhra	india	8309053400	58909	2024-08-10	17:38:11	Saturday	Jayasree Kanamarlapoodi
3	ABFU0001	Sylhet	321, Subid Bazaar	Sylhet	Bangladesh	1789123456	4336	2024-08-10	17:40:12	Saturday	UI Libfh
\.


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (adminid, adminname, adminmail, adminmobile, adminpassword) FROM stdin;
admin1	Jaya	jaya@gmail.com	8309053400	jaya
admin1	Jaya	jaya@gmail.com	8309053400	jaya
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cards (id, userid, cardnumber, cardholder, cardexpiry, cardcvv) FROM stdin;
\.


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (id, productid, userid, quantity, remaining_quantity, addeddate, addedtime, addedday) FROM stdin;
54	ABFP0006	ABFU0001	0	0	2024-08-26	11:28:26	Monday
63	ABFP0007	ABFU0001	0	0	2024-08-26	11:28:38	Monday
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, categoryname, addeddate, addedtime, addedday, status) FROM stdin;
5	desk	2024-08-10	14:44:54	Saturday	inactive
10	sir	2024-08-10	16:43:02	Saturday	inactive
9	shakalaka boom boom	2024-08-10	16:41:53	Saturday	inactive
8	vikram	2024-08-10	16:41:02	Saturday	inactive
7	nikhil	2024-08-10	16:24:48	Saturday	inactive
11	chair	2024-08-10	16:43:14	Saturday	inactive
12	laptop	2024-08-10	16:54:09	Saturday	inactive
6	tables	2024-08-10	14:45:16	Saturday	inactive
14	table	2024-08-10	17:47:50	Saturday	inactive
13	bottles	2024-08-10	16:56:20	Saturday	inactive
16	bla	2024-08-12	13:40:25	Monday	inactive
5	desk	2024-08-10	14:44:54	Saturday	inactive
10	sir	2024-08-10	16:43:02	Saturday	inactive
9	shakalaka boom boom	2024-08-10	16:41:53	Saturday	inactive
8	vikram	2024-08-10	16:41:02	Saturday	inactive
7	nikhil	2024-08-10	16:24:48	Saturday	inactive
11	chair	2024-08-10	16:43:14	Saturday	inactive
12	laptop	2024-08-10	16:54:09	Saturday	inactive
6	tables	2024-08-10	14:45:16	Saturday	inactive
14	table	2024-08-10	17:47:50	Saturday	inactive
13	bottles	2024-08-10	16:56:20	Saturday	inactive
16	bla	2024-08-12	13:40:25	Monday	inactive
15	jaya	2024-08-12	13:37:50	Monday	inactive
15	jaya	2024-08-12	13:37:50	Monday	inactive
4	sofas	2024-08-10	14:44:27	Saturday	inactive
4	sofas	2024-08-10	14:44:27	Saturday	inactive
18	jaya1	2024-09-05	14:17:53	Thursday	inactive
17	recliner	2024-08-26	13:05:42	Monday	inactive
19	jaya2	2024-09-05	14:24:02	Thursday	inactive
20	jaya3	2024-09-05	14:25:12	Thursday	inactive
21	jaya4	2024-09-05	14:34:14	Thursday	inactive
22	mouni	2024-09-06	17:04:12	Friday	inactive
3	chairs category	2024-08-10	14:44:12	Saturday	active
3	chairs category	2024-08-10	14:44:12	Saturday	active
\.


--
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colors (id, colorname, colorcode) FROM stdin;
1	Au Chico	#875050
2	Clam Shell	#cdab9f
1	Au Chico	#875050
2	Clam Shell	#cdab9f
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, productid, imgurl1, imgurl2, imgurl3, imgurl4, imgurl5, imgurl6) FROM stdin;
\.


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory (id, productid, invoiceid, quantity, remaining_quantity, addeddate, addedtime, addedday) FROM stdin;
\.


--
-- Data for Name: inventoryy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventoryy (inventory_id, product_id, color, selling_price, purchase_price, total_cost, date, status, "time", remaining_qty) FROM stdin;
\.


--
-- Data for Name: invoice_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoice_details (id, productid, invoiceid, quantity, addeddate, addedtime, addedday) FROM stdin;
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoices (id, invoicenumber, invoiceimage) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, user_id, product_id, order_date, mode_of_payment, qty, price, tax, order_time, expected_delivery) FROM stdin;
\.


--
-- Data for Name: otp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.otp (id, otpnumber, userid) FROM stdin;
1	71859	ABFU0001
1	71859	ABFU0001
2	36117	ABFU0001
3	25240	ABFU0001
4	67314	ABFU0001
5	37361	ABFU0001
6	85750	ABFU0001
7	66422	ABFU0001
8	72337	ABFU0001
9	24799	ABFU0001
10	15749	ABFU0001
11	96645	ABFU0001
12	22181	ABFU0001
13	56504	ABFU0001
14	48478	ABFU0001
15	49804	ABFU0001
16	85385	ABFU0001
17	86360	ABFU0001
18	63798	ABFU0001
\.


--
-- Data for Name: product_order_tracking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_order_tracking (tracking_id, order_id, inventory_id, product_id, qty, remaining_qty, status, tracking_date, tracking_time) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, productname, categoryid, subcategoryid, originalprice, currentprice, discount, description, specification, addeddate, addedtime, addedday, status) FROM stdin;
8	chair product 2	ABFCG0003	ABFSC0002	45678	41111	10	chair product 1 desc	specification	2024-08-12	13:43:20	Monday	active
8	chair product 2	ABFCG0003	ABFSC0002	45678	41111	10	chair product 1 desc	specification	2024-08-12	13:43:20	Monday	active
4	table product 2	ABFCG0006	ABFSC0001	7000	7000	0	table product 2 description	specification	2024-08-10	15:04:16	Saturday	inactive
6	chair product 3	ABFCG0003	ABFSC0002	45999	45999	0	chair product 2 description	specification	2024-08-10	17:14:57	Saturday	inactive
2	Sofa Product 2	ABFCG0004	ABFSC0003	67489	64115	5	Sofa Product 1 description	specification	2024-08-10	14:56:05	Saturday	inactive
7	Oliver Mid Back Ergonomic Office Chair with Adjustable Seat Height- White	ABFCG0004	ABFSC0004	6700	6566	2	In this query, products.productid, products.productname, products.category, products.price, and products.status are explicitly listed in the GROUP BY clause.	specification	2024-08-10	17:53:32	Saturday	inactive
1	chair product 2	ABFCG0003	ABFSC0002	6700	6700	0	chair product 1 description	specification	2024-08-10	14:54:53	Saturday	active
3	table product 1	ABFCG0006	ABFSC0001	7000	5250	25	table product 1 description	specification	2024-08-10	14:57:20	Saturday	inactive
4	table product 2	ABFCG0006	ABFSC0001	7000	7000	0	table product 2 description	specification	2024-08-10	15:04:16	Saturday	inactive
6	chair product 3	ABFCG0003	ABFSC0002	45999	45999	0	chair product 2 description	specification	2024-08-10	17:14:57	Saturday	inactive
2	Sofa Product 2	ABFCG0004	ABFSC0003	67489	64115	5	Sofa Product 1 description	specification	2024-08-10	14:56:05	Saturday	inactive
7	Oliver Mid Back Ergonomic Office Chair with Adjustable Seat Height- White	ABFCG0004	ABFSC0004	6700	6566	2	In this query, products.productid, products.productname, products.category, products.price, and products.status are explicitly listed in the GROUP BY clause.	specification	2024-08-10	17:53:32	Saturday	inactive
1	chair product 2	ABFCG0003	ABFSC0002	6700	6700	0	chair product 1 description	specification	2024-08-10	14:54:53	Saturday	active
3	table product 1	ABFCG0006	ABFSC0001	7000	5250	25	table product 1 description	specification	2024-08-10	14:57:20	Saturday	inactive
5	sofa Product 6	ABFCG0004	ABFSC0005	35999	34200	5	sofa Product 4 description	specification	2024-08-10	17:04:49	Saturday	inactive
5	sofa Product 6	ABFCG0004	ABFSC0005	35999	34200	5	sofa Product 4 description	specification	2024-08-10	17:04:49	Saturday	inactive
\.


--
-- Data for Name: productsizecolors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productsizecolors (id, productid, colorid) FROM stdin;
4	ABFP0003	ABFC0001
5	ABFP0004	ABFC0001
6	ABFP0004	ABFC0002
8	ABFP0002	ABFC0002
13	ABFP0006	ABFC0001
16	ABFP0007	ABFC0001
17	ABFP0007	ABFC0002
18	ABFP0001	ABFC0001
19	ABFP0001	 ABFC0002
4	ABFP0003	ABFC0001
5	ABFP0004	ABFC0001
6	ABFP0004	ABFC0002
8	ABFP0002	ABFC0002
13	ABFP0006	ABFC0001
16	ABFP0007	ABFC0001
17	ABFP0007	ABFC0002
18	ABFP0001	ABFC0001
19	ABFP0001	 ABFC0002
23	ABFP0005	ABFC0001
24	ABFP0008	ABFC0001
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratings (id, productid, overallrating, addeddate, addedtime, addedday) FROM stdin;
2	ABFP0002	5	2024-08-10	14:56:05	Saturday
3	ABFP0003	5	2024-08-10	14:57:20	Saturday
4	ABFP0004	5	2024-08-10	15:04:16	Saturday
5	ABFP0005	5	2024-08-10	17:04:49	Saturday
6	ABFP0006	5	2024-08-10	17:14:57	Saturday
1	ABFP0001	2	2024-08-10	14:54:53	Saturday
7	ABFP0007	5	2024-08-10	17:53:32	Saturday
8	ABFP0008	5	2024-08-12	13:43:20	Monday
2	ABFP0002	5	2024-08-10	14:56:05	Saturday
3	ABFP0003	5	2024-08-10	14:57:20	Saturday
4	ABFP0004	5	2024-08-10	15:04:16	Saturday
5	ABFP0005	5	2024-08-10	17:04:49	Saturday
6	ABFP0006	5	2024-08-10	17:14:57	Saturday
1	ABFP0001	2	2024-08-10	14:54:53	Saturday
7	ABFP0007	5	2024-08-10	17:53:32	Saturday
8	ABFP0008	5	2024-08-12	13:43:20	Monday
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, userid, productid, reviewcomment, addeddate, addedtime, addedday, rating) FROM stdin;
1	ABFU0006	ABFP0001	cfcfggg	2024-08-10	17:28:22	Saturday	1
2	ABFU0001	ABFP0001	Not good	2024-08-10	17:30:36	Saturday	1
3	ABFU0001	ABFP0001	Not bad	2024-08-10	17:31:08	Saturday	3
1	ABFU0006	ABFP0001	cfcfggg	2024-08-10	17:28:22	Saturday	1
2	ABFU0001	ABFP0001	Not good	2024-08-10	17:30:36	Saturday	1
3	ABFU0001	ABFP0001	Not bad	2024-08-10	17:31:08	Saturday	3
\.


--
-- Data for Name: sizes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sizes (id, sizename) FROM stdin;
\.


--
-- Data for Name: specification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.specification (id, productid, specification_name, specification_value) FROM stdin;
4	ABFP0003	name1	value1
5	ABFP0004	color	Brown
8	ABFP0002	color	  Red
9	ABFP0002	 Height	 100cm
15	ABFP0006	spec name3	  spec value3
16	ABFP0006	name2	value2
19	ABFP0007	color	 Brown
20	ABFP0007	 width	 30
21	ABFP0001	color	 Brown
22	ABFP0001	 Height	 170cm
4	ABFP0003	name1	value1
5	ABFP0004	color	Brown
8	ABFP0002	color	  Red
9	ABFP0002	 Height	 100cm
15	ABFP0006	spec name3	  spec value3
16	ABFP0006	name2	value2
19	ABFP0007	color	 Brown
20	ABFP0007	 width	 30
21	ABFP0001	color	 Brown
22	ABFP0001	 Height	 170cm
28	ABFP0005	 Height	  70cm
29	ABFP0005	 color	  Brown
30	ABFP0008	spec name1	 spec value1
\.


--
-- Data for Name: subcategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subcategories (id, subcategoryname, addeddate, addedtime, addedday, status, categoryid) FROM stdin;
4	sub sofa1	2024-08-10	14:50:01	Saturday	active	ABFCG0004
2	sub chair	2024-08-10	14:47:33	Saturday	active	ABFCG0003
5	sub sofa3	2024-08-10	16:59:40	Saturday	active	ABFCG0004
6	sub bottle	2024-08-11	18:42:24	Sunday	inactive	ABFCG0013
1	sub tables1	2024-08-10	14:46:23	Saturday	active	ABFCG0006
7	sub jayasree	2024-08-12	13:41:29	Monday	inactive	ABFCG0015
4	sub sofa1	2024-08-10	14:50:01	Saturday	active	ABFCG0004
2	sub chair	2024-08-10	14:47:33	Saturday	active	ABFCG0003
5	sub sofa3	2024-08-10	16:59:40	Saturday	active	ABFCG0004
6	sub bottle	2024-08-11	18:42:24	Sunday	inactive	ABFCG0013
1	sub tables1	2024-08-10	14:46:23	Saturday	active	ABFCG0006
7	sub jayasree	2024-08-12	13:41:29	Monday	inactive	ABFCG0015
8	sub recliner	2024-08-26	13:06:05	Monday	active	ABFCG0017
\.


--
-- Data for Name: usercontactdetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usercontactdetails (id, first_name, last_name, email, mobile) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, firstname, lastname, email, phonenumber, password, status) FROM stdin;
1	Jayasree	Kanamarlapoodi	jaya@gmail.com	8309053400	Jaya@123	Active
1	Jayasree	Kanamarlapoodi	jaya@gmail.com	8309053400	Jaya@123	Active
\.


--
-- Data for Name: wishlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wishlist (id, productid, userid, quantity, remaining_quantity, addeddate, addedtime, addedday) FROM stdin;
6	ABFP0005	ABFU0001	20	120	2024-08-12	10:47:34	Monday
6	ABFP0005	ABFU0001	20	120	2024-08-12	10:47:34	Monday
\.


--
-- Name: addressnumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.addressnumber', 3, true);


--
-- Name: cardnumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cardnumber', 1, false);


--
-- Name: cartnumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cartnumber', 120, true);


--
-- Name: categorynumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorynumber', 22, true);


--
-- Name: colorsnumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colorsnumber', 2, true);


--
-- Name: imagenumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.imagenumber', 1, false);


--
-- Name: inventorynumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventorynumber', 1, false);


--
-- Name: inventoryy_inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventoryy_inventory_id_seq', 1, false);


--
-- Name: invoicedetailnumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invoicedetailnumber', 1, false);


--
-- Name: invoicenumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invoicenumber', 1, false);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 1, false);


--
-- Name: otpidnumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.otpidnumber', 18, true);


--
-- Name: product_order_tracking_tracking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_order_tracking_tracking_id_seq', 1, false);


--
-- Name: product_specification; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_specification', 30, true);


--
-- Name: productsizecolornumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productsizecolornumber', 24, true);


--
-- Name: productsnumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productsnumber', 8, true);


--
-- Name: ratingsnumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ratingsnumber', 8, true);


--
-- Name: reviewnumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviewnumber', 3, true);


--
-- Name: sizesnumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sizesnumber', 1, false);


--
-- Name: subcategorynumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subcategorynumber', 8, true);


--
-- Name: usercontactid; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usercontactid', 1, false);


--
-- Name: usernumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usernumber', 1, true);


--
-- Name: wishlistnumber; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.wishlistnumber', 6, true);


--
-- PostgreSQL database dump complete
--

