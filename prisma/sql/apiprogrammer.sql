PGDMP                     	    |            apiprogrammer    15.1    15.1 )    2           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            3           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            4           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            5           1262    88859    apiprogrammer    DATABASE     �   CREATE DATABASE apiprogrammer WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE apiprogrammer;
                postgres    false            Y           1247    89671    TransactionType    TYPE     M   CREATE TYPE public."TransactionType" AS ENUM (
    'TOPUP',
    'PAYMENT'
);
 $   DROP TYPE public."TransactionType";
       public          postgres    false            �            1259    89146    Banner    TABLE     >  CREATE TABLE public."Banner" (
    id integer NOT NULL,
    banner_name text NOT NULL,
    banner_image text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."Banner";
       public         heap    postgres    false            �            1259    89145    Banner_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Banner_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Banner_id_seq";
       public          postgres    false    218            6           0    0    Banner_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Banner_id_seq" OWNED BY public."Banner".id;
          public          postgres    false    217            �            1259    89524    Service    TABLE     e  CREATE TABLE public."Service" (
    id integer NOT NULL,
    service_code text NOT NULL,
    service_name text NOT NULL,
    service_icon text NOT NULL,
    service_tarif integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."Service";
       public         heap    postgres    false            �            1259    89523    Service_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Service_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Service_id_seq";
       public          postgres    false    220            7           0    0    Service_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Service_id_seq" OWNED BY public."Service".id;
          public          postgres    false    219            �            1259    89679    Transaction    TABLE     �  CREATE TABLE public."Transaction" (
    id integer NOT NULL,
    invoice_number text NOT NULL,
    transaction_type public."TransactionType" NOT NULL,
    total_amount integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL,
    "serviceId" integer
);
 !   DROP TABLE public."Transaction";
       public         heap    postgres    false    857            �            1259    89678    Transaction_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Transaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Transaction_id_seq";
       public          postgres    false    222            8           0    0    Transaction_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Transaction_id_seq" OWNED BY public."Transaction".id;
          public          postgres    false    221            �            1259    88874    User    TABLE     �  CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    profile_image text,
    balance integer DEFAULT 0 NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    88873    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    216            9           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          postgres    false    215            �            1259    88862    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            �           2604    89149 	   Banner id    DEFAULT     j   ALTER TABLE ONLY public."Banner" ALTER COLUMN id SET DEFAULT nextval('public."Banner_id_seq"'::regclass);
 :   ALTER TABLE public."Banner" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    89527 
   Service id    DEFAULT     l   ALTER TABLE ONLY public."Service" ALTER COLUMN id SET DEFAULT nextval('public."Service_id_seq"'::regclass);
 ;   ALTER TABLE public."Service" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    89682    Transaction id    DEFAULT     t   ALTER TABLE ONLY public."Transaction" ALTER COLUMN id SET DEFAULT nextval('public."Transaction_id_seq"'::regclass);
 ?   ALTER TABLE public."Transaction" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            }           2604    88877    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            +          0    89146    Banner 
   TABLE DATA           h   COPY public."Banner" (id, banner_name, banner_image, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   2       -          0    89524    Service 
   TABLE DATA           z   COPY public."Service" (id, service_code, service_name, service_icon, service_tarif, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   �2       /          0    89679    Transaction 
   TABLE DATA           �   COPY public."Transaction" (id, invoice_number, transaction_type, total_amount, "createdAt", "updatedAt", "userId", "serviceId") FROM stdin;
    public          postgres    false    222   �3       )          0    88874    User 
   TABLE DATA           ~   COPY public."User" (id, email, first_name, last_name, password, "createdAt", "updatedAt", profile_image, balance) FROM stdin;
    public          postgres    false    216   g5       '          0    88862    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    214   �6       :           0    0    Banner_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Banner_id_seq"', 3, true);
          public          postgres    false    217            ;           0    0    Service_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Service_id_seq"', 12, true);
          public          postgres    false    219            <           0    0    Transaction_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Transaction_id_seq"', 29, true);
          public          postgres    false    221            =           0    0    User_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."User_id_seq"', 9, true);
          public          postgres    false    215            �           2606    89154    Banner Banner_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Banner"
    ADD CONSTRAINT "Banner_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Banner" DROP CONSTRAINT "Banner_pkey";
       public            postgres    false    218            �           2606    89532    Service Service_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Service" DROP CONSTRAINT "Service_pkey";
       public            postgres    false    220            �           2606    89688    Transaction Transaction_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Transaction" DROP CONSTRAINT "Transaction_pkey";
       public            postgres    false    222            �           2606    88883    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    216            �           2606    88870 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    214            �           1259    89533    Service_service_code_key    INDEX     _   CREATE UNIQUE INDEX "Service_service_code_key" ON public."Service" USING btree (service_code);
 .   DROP INDEX public."Service_service_code_key";
       public            postgres    false    220            �           1259    89689    Transaction_invoice_number_key    INDEX     k   CREATE UNIQUE INDEX "Transaction_invoice_number_key" ON public."Transaction" USING btree (invoice_number);
 4   DROP INDEX public."Transaction_invoice_number_key";
       public            postgres    false    222            �           1259    88884    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    216            �           2606    90477 &   Transaction Transaction_serviceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 T   ALTER TABLE ONLY public."Transaction" DROP CONSTRAINT "Transaction_serviceId_fkey";
       public          postgres    false    220    3218    222            �           2606    89690 #   Transaction Transaction_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public."Transaction" DROP CONSTRAINT "Transaction_userId_fkey";
       public          postgres    false    222    3214    216            +   �   x���;�  �N���.����Ipd���&�}��<����4�Ǩ�KY��]�2��BOj�����uc�O�yI���P�Z	M�Ҟ�G�����4�����7�,�#�3�"���9���\�      -   M  x����r�0�ϛ��D����P�"4*pp:�� ���p��7��S�`��&����۝���+󁋋(�yp��j��q���x�L�Z4�)�j|jo�/�Re`[� ��=��Sâs�Ve��T�#|�:od�}QX��9�Q��>���WQf�(E9��Cu9�����^1J#�8h|���M�LW��R4� ޽��M^�ո��A���H-[�#G-����i�"��I��#����r�B�?=/����|��sZ+qKZkt���uG�g!��@�����.G�&�z��i��8ҁ#_�|	�g{e'��hL�F\�n"����t�      /   Z  x���=n�0�Y:E/��HI�֡C���r�sT��0���������w��BHe�H��}�9$��K�_;��7��u`���c�Q�(T4Y:�3�WyS���j�-�-۬j���|eų���椢|eճ�Ͷ�h�0_��ٺ�
2� ]��ɶM�A
�-�W�<������cL���!2��sK��jW���:��^���Ofr*�U��Tw���%��{@���`5sK-�����E��}-�K��喈2�̾]��Rv˧;g�0�b
:7#�jf߃ٷX��8�@��z����R����|Q}��m4ay]*�*a�4�����0Y�BU�|����f$-i      )   y  x���MS�0E��+\tې@h3�����V��&JA�L
S��Ҏӎ��m2��-ΙG$�rv�,�@P��Fi\��}:�����{���a�ަ�P�M��/�9�3��;��ĳ|c��v�a[R���v:Q��A �o�z����(�J@��2b|ǣP�U��,�"��LDQx:eB�JP�{vޒ�X! :��>~>=V�y�|qϴ5F@sh�3�F�t����f���k���_� �&�&j�u�k�����k�W�
�k0X�N�f)�`�ŗE�m/ئ^ w�v�i2>��M��>�y$@��u������l!K���,����J*"*%��9w+^ƭM�]�Nݯ=DUK:4z��	Ȳ�Qɾ�      '   �  x�u�kn#9�;���|I$�{�I�v3@2��/�ڵ�`���f�'VU7����2eh�:���^���kX��5C�M`�;�m��v�B��pO�����Rwo�[�v" )��Q� 97����׫��I��_�?��χ�������?1������k,+���(S�[fIU��w��'Yu���y�F�7� �XQ�b��k�3D8x�K-,�T���?���5��_Q��8���q �n��2�Fr�^R�*��`s�Nn���+Xc�j�q^�x���j@ j�]īL�F}
v�-\� ȣ<X���\r ��^s�g��'T��α�*��5���W̅J,6�I�On��!W�γ�v��c��rj�A;�ל�-��4�*�ܪ�쌒w��搯9�&@���C,�ds���T"s���['�O�U�֖^�[�{�Q�kFi�Js�Шsnɼ��D0č
I�l(�v�P�9�o4���w_-�he��}���Q�Ә�}�:N��_��"�g�%�����S@��&z5�/��ӥ��>�؁~��9�_pp�8�}����q=���#�߷$3�����|���e1גg����3!.�����i��[�%A"c�l�I�1��M�r7�2���w6\�1iΘ3���p��t��UӢrE���J�~=��;���TS����X7�%{3Q4z��Q2���n�e�B�*�,]�tf������<VϨ�ʠgL��|_
UG��+t�go�x�RA^Q�[��}���w8��6�،�x> ZA�Rd��L9'�Z��Rk�y�<Zh_���e'ךY�QI��ԠW�x��`�h�#z�?+�F�!z6���a��S_Lj�X��i�-�g�v��)e���)���ƅ��X_��6�d�eK�J�LD[�3��;Y���A���Ҝ"x�B���]�G!c�5ϧN�����������_����     