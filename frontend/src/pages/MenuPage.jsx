import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import logo from '../assets/logo.png';
import menuPlaceholder from '../assets/menu-placeholder.png';
import extraPlaceholder from '../assets/extra_placeholder.png';

// --- STYLES ---

const PageWrapper = styled.div`
  background-color: #121212;
  color: #ffffff;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  padding-bottom: 80px;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(10px);
  padding: 15px 0;
  z-index: 1000;
  border-bottom: 1px solid #333;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 0 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const NavButton = styled.a`
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 8px 16px;
  border-radius: 20px;
  background: transparent;
  border: 1px solid #ff9f1c;
  color: #ff9f1c;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover, &.active {
    background: #ff9f1c;
    color: #121212;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 159, 28, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 6px 12px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px; /* Space for fixed nav */
  padding-bottom: 20px;
  background: #121212;
`;

const Logo = styled.img`
  max-width: 200px;
  height: auto;
  /* border-radius: 50%; Optional: if it needs to be circular */
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 20px 20px;
`;

const Section = styled.section`
  margin-bottom: 80px;
  scroll-margin-top: 140px; /* Adjusted for nav + logo space if needed, or just nav */
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #ff9f1c;
  text-align: center;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #ff9f1c;
    margin: 10px auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
`;

const Card = styled.div`
  background: #1e1e1e;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #333;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    border-color: #ff9f1c;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ItemName = styled.h3`
  font-size: 1.25rem;
  color: #fff;
  margin: 0;
  font-weight: 600;
`;

const Price = styled.span`
  background: #ff9f1c;
  color: #121212;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 800;
  font-size: 1rem;
`;

const Ingredients = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  font-style: italic;
`;

const ExtrasSection = styled.div`
  margin-top: 30px;
  background: #252525;
  padding: 20px;
  border-radius: 12px;
`;

const SubTitle = styled.h4`
  color: #ff9f1c;
  margin-bottom: 15px;
  font-size: 1.2rem;
  border-bottom: 1px solid #444;
  padding-bottom: 8px;
`;

const ExtrasGrid = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const ExtraItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1e1e1e;
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid #444;
  color: #ddd;
`;

// Tacos Specific Styles
const TacosTable = styled.div`
  width: 100%;
  overflow-x: auto;
  background: #1e1e1e;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #333;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;
  
  th {
    text-align: left;
    padding: 15px;
    color: #ff9f1c;
    border-bottom: 1px solid #444;
    font-size: 1.1rem;
  }
  
  td {
    padding: 15px;
    border-bottom: 1px solid #2a2a2a;
    color: #ddd;
  }

  tr:last-child td {
    border-bottom: none;
  }

  .price-col {
    font-weight: bold;
    color: #fff;
  }
`;

const TacosDescription = styled.p`
  text-align: center;
  color: #ccc;
  font-size: 1.1rem;
  margin-bottom: 30px;
  font-style: italic;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ExtraCard = styled.div`
  background: #1e1e1e;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    border-color: #ff9f1c;
  }
`;

const ExtraImage = styled.img`
  width: 100%;
  height: 80px;
  object-fit: contain;
  margin-bottom: 8px;
`;

const ExtraName = styled.span`
  color: #ccc;
  font-size: 0.9rem;
  font-weight: 500;
`;

const SpecialSection = styled(Section)`
  background: linear-gradient(135deg, rgba(255, 159, 28, 0.05) 0%, rgba(18, 18, 18, 0) 100%);
  padding: 40px 20px;
  border-radius: 20px;
  border: 1px solid rgba(255, 159, 28, 0.2);
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '★';
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 15rem;
    color: rgba(255, 159, 28, 0.03);
    transform: rotate(15deg);
    pointer-events: none;
  }
`;


// --- DATA ---

const supremeItems = [
  { name: 'Suprême Chicken Crispy', price: 27 },
  { name: 'Suprême Poulet', price: 27 },
  { name: 'Suprême Nuggets', price: 30 },
  { name: 'Suprême Cordon Bleu', price: 33 },
  { name: 'Suprême Viande Hachée', price: 35 },
  { name: 'Suprême Mixte', price: 38 },
];

const pitacozzaItems = [
  { name: 'Poulet', price: 30, ingredients: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Poulet, Frites' },
  { name: 'Viande Hachée', price: 33, ingredients: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Viande Hachée, Frites' },
  { name: 'Crispy', price: 33, ingredients: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Crispy, Frites' },
  { name: 'Fruits de mer', price: 40, ingredients: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Fruits de mer, Vermicelles, Olives Vertes' },
  { name: 'Merguez', price: 31, ingredients: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Merguez, Frites' },
  { name: 'Nuggets', price: 32, ingredients: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Nuggets, Frites' },
  { name: 'Cordon bleu', price: 34, ingredients: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Cordon Bleu, Frites' },
  { name: 'Mixte', price: 35, ingredients: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, 2 Viandes aux Choix, Frites' },
];

const tacosItems = [
  { name: 'Poulet', m: 25, l: 35, xl: 45 },
  { name: 'Viande Hachée', m: 30, l: 40, xl: 55 },
  { name: 'Fruits de mer', m: 32, l: 45, xl: 55 },
  { name: 'Crispy', m: 27, l: 38, xl: 48 },
  { name: 'Nuggets', m: 28, l: 38, xl: 50 },
  { name: 'Cordon bleu', m: 30, l: 40, xl: 55 },
  { name: 'Merguez', m: 28, l: 39, xl: 50 },
  { name: 'Mixte', m: 33, l: 43, xl: 55 },
];

const platsItems = [
  { name: 'Plat Chicken Crispy', price: 35 },
  { name: 'Plat Poulet', price: 35 },
  { name: 'Plat Nuggets', price: 35 },
  { name: 'Plat Viande Hachée', price: 40 },
  { name: 'Plat Cordon Bleu', price: 40 },
  { name: 'Plat Emincé', price: 40 },
  { name: 'Plat Aji Naklou', price: 45 },
];

const supplementsItems = [
  'Jambon', 'Onion Crispy', 'Maasdam', 'Fromage Rouge', 'Cheddar', 'Fromage Bleu', 'Mozzarella'
];

const gratinageItems = [
  'Mozzarella', 'Fromage Bleu', 'Fromage Rouge', 'Cheddar', 'Maasdam'
];

const pizzaItems = [
  { name: 'Margarita', p1: 25, p2: 35, ingredients: 'Mozzarella, Olives, Poivrons' },
  { name: 'Poulet', p1: 30, p2: 45, ingredients: 'Mozzarella, Poulet, Olives, Poivrons' },
  { name: 'Viande Hachée', p1: 34, p2: 48, ingredients: 'Mozzarella, Viande, Olives, Poivron' },
  { name: 'Fruits De Mer', p1: 35, p2: 50, ingredients: 'Mozzarella, Fruits de mer, Olives, Poivrons' },
  { name: 'Quatre Fromages', p1: 35, p2: 48, ingredients: 'Mozzarella + 3 fromages aux choix' },
  { name: 'Charcuterie', p1: 32, p2: 45, ingredients: 'Mozzarella, Charcuterie, Champignons, Olives' },
  { name: 'Peperoni', p1: 34, p2: 45, ingredients: 'Mozzarella, Peperoni, Tomate cerise' },
  { name: 'Thon', p1: 30, p2: 45, ingredients: 'Mozzarella, Thon, Olives, Oignon, Poivron' },
  { name: 'Végétarienne', p1: 30, p2: 40, ingredients: 'Mozzarella, Poivron, Tomate, Oignon, Courgette, Champignons, Olives' },
  { name: 'Quatre Saisons', p1: 35, p2: 50, ingredients: 'Mozzarella, quatres ingrédients aux choix' },
];

const sandwichItems = [
  { name: 'Thon', price: 16 },
  { name: 'Poulet', price: 18 },
  { name: 'Viande Hachée', price: 20 },
  { name: 'Nuggets', price: 20 },
  { name: 'Charcuterie', price: 20 },
  { name: 'Mixte', price: 24 },
  { name: 'Cordon Bleu', price: 25 },
];

const spaghettiItems = [
  { name: 'Spaghetti Poulet', price: 35 },
  { name: 'Spaghetti Thon', price: 35 },
  { name: 'Spaghetti Bolognaise', price: 40 },
  { name: 'Spaghetti Fruits de mer', price: 42 },
];

const saladeItems = [
  { name: 'Marocaine', price: 15 },
  { name: 'Légumes', price: 23 },
  { name: 'Mexicaine', price: 25 },
  { name: 'Poulet', price: 28 },
  { name: 'Aji Naklou', price: 38 },
  { name: 'Salade de fruits', price: 18 },
];

const comboItems = [
  { name: 'Poulet', price: 30, description: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Poulet' },
  { name: 'Viande Hachée', price: 33, description: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Viande Hachée' },
  { name: 'Fruits de mer', price: 40, description: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Fruits de mer, Vermicelles, Olives Vert' },
  { name: 'Crispy', price: 33, description: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Crispy' },
  { name: 'Nuggets', price: 32, description: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Nuggets' },
  { name: 'Cordon bleu', price: 34, description: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Cordon Bleu' },
  { name: 'Merguez', price: 31, description: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Merguez' },
  { name: 'Merguez', price: 31, description: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, Merguez' },
  { name: 'Mixte', price: 35, description: 'Pâte à Pizza, Mozzarella, Sauces aux Choix, 2 Viandes aux Choix' },
];

const pasticcioItems = [
  { name: 'Poulet', price: 30, ingredients: 'Frites, Sauce crèmeuse, Mozzarella, Poulet' },
  { name: 'Viande Hachée', price: 35, ingredients: 'Frites, Sauce crèmeuse, Mozzarella, Viande Hachée' },
  { name: 'Fruits de mer', price: 38, ingredients: 'Frites, Sauce crèmeuse, Mozzarella, Fruits de mer' },
  { name: 'Crispy', price: 32, ingredients: 'Frites, Sauce crèmeuse, Mozzarella, Crispy' },
  { name: 'Mixte', price: 36, ingredients: 'Frites, Sauce crèmeuse, Mozzarella, 2 Viandes aux Choix' },
  { name: 'Nuggets', price: 33, ingredients: 'Frites, Sauce crèmeuse, Mozzarella, Nuggets' },
  { name: 'Cordon bleu', price: 35, ingredients: 'Frites, Sauce crèmeuse, Mozzarella, Cordon Bleu' },
  { name: 'Merguez', price: 31, ingredients: 'Frites, Sauce crèmeuse, Mozzarella, Merguez' },
  { name: 'Jambon', price: 31, ingredients: 'Frites, Sauce crèmeuse, Mozzarella, Jambon' },
];

const cheesyItems = [
  { name: 'Cheese fries', price: 15, ingredients: 'Frites, Sauce Cheesy crèmeuse, Crispy Onion' },
  { name: 'Cheesy potatoes', price: 23, ingredients: 'Potatoes, Sauce Cheezzy crèmeuse, Crispy Onion' },
  { name: 'Cheesy Crispy', price: 35, ingredients: 'Frites, Sauce Cheezy crèmeuse, Crispy Onion, Poulet Crispy, Sauce BBQ' },
  { name: 'Nachos', price: 24, ingredients: 'Nachos, Sauce Cheesy crèmeuse, Crispy Onion' },
];

const burgerItems = [
  { name: 'Cheese Burger', price: 25, ingredients: 'Pain Burger, Salade, Tomate, Oignon, Cheddar, Cornichon, Sauce Burger maison, Steak' },
  { name: 'Chicken Burger', price: 25, ingredients: 'Pain Burger, Salade, Tomate, Oignon, Cheddar, Cornichon, Sauce Burger maison, Chicken' },
  { name: 'Double Cheese Burger', price: 40, ingredients: 'Pain Burger, Salade, Tomate, Oignon, Cheddar, Cornichon, Sauce Burger maison, 2 Steak' },
  { name: 'Double Chicken Burger', price: 40, ingredients: 'Pain Burger, Salade, Tomate, Oignon, Cheddar, Cornichon, Sauce Burger maison, 2 Chicken' },
  { name: 'Mixte', price: 40, ingredients: 'Pain Burger, Salade, Tomate, Oignon, Cheddar, Cornichon, Sauce Burger maison, Steak, Chicken' },
];

const burgerSupplements = [
  { name: 'Jambon', img: 'legacy' },
  { name: 'Onion Crispy', img: 'legacy' },
  { name: 'Omelette', img: 'legacy' },
  { name: 'Cheddar', img: 'legacy' },
];

const paniniItems = [
  { name: 'Omelette', price: 14 },
  { name: 'Thon', price: 18 },
  { name: 'Poulet', price: 19 },
  { name: 'Charcuterie', price: 20 },
  { name: 'Nuggets', price: 20 },
  { name: 'Merguez', price: 20 },
  { name: 'Viande Hachée', price: 22 },
  { name: 'Cordon bleu', price: 23 },
  { name: 'Mixte', price: 24 },
];

const texMexItems = [
  { name: 'Frites', price: 7 },
  { name: 'Potatoes', price: 12 },
  { name: 'Onion rings', price: 15 },
  { name: 'Nuggets', price: 18 },
  { name: 'Cordon bleu', price: 12 },
];

const dessertItems = [
  { name: 'Dessert du jour', price: '12 / 15 / 20' },
];

const boissonsItems = [
  { name: 'Eau Minérale 50 cl', price: 5 },
  { name: 'Pulpy', price: 6 },
  { name: 'Soda 25cl', price: 7 },
  { name: 'Eau Gazeuse 25cl', price: 8 },
  { name: 'Eau Gazeuse 50cl', price: 10 },
  { name: 'Jus d\'Orange', price: 14 },
  { name: 'Jus de Citron', price: 14 },
  { name: 'Jus de Pomme', price: 16 },
  { name: 'Jus de Banane', price: 16 },
  { name: 'Jus de pêche', price: 18 },
  { name: 'Jus de Fraise', price: 18 },
  { name: 'Jus d\'Avocat', price: 18 },
  { name: 'Jus de saison', price: 18 },
  { name: 'Panaché', price: 20 },
  { name: 'Jus d\'Avocat aux fruits secs', price: 20 },
];

const showPlatDuJour = true; // Set to false to hide
const showOfferOfTheDay = true; // Set to false to hide

const platDuJourItem = { 
  name: 'Tajine de Poulet aux Olives', 
  price: 45, 
  ingredients: 'Poulet fermier, olives vertes, citron confit, frites maison, pain complet',
  description: 'Notre spécialité du jour, préparée avec passion et des produits frais.'
};

const offerItem = {
  name: 'Menu Étudiant Simple', 
  price: 35, 
  ingredients: '1 Tacos M + 1 Boisson 33cl + 1 Portion de Frites',
  description: 'Offre valable uniquement le midi sur présentation de la carte étudiant.'
};

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState('supreme-section');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  return (
    <PageWrapper>
      <Helmet>
        <title>Menu - Resto Feedback</title>
      </Helmet>

      <Nav>
        <NavContainer>
           {showPlatDuJour && <NavButton onClick={() => scrollToSection('plat-du-jour-section')}>PLAT DU JOUR</NavButton>}
           {showOfferOfTheDay && <NavButton onClick={() => scrollToSection('offer-section')}>OFFRE</NavButton>}
           <NavButton onClick={() => scrollToSection('plats-section')}>PLATS</NavButton>
           <NavButton onClick={() => scrollToSection('pizza-section')}>PIZZA</NavButton>
           <NavButton onClick={() => scrollToSection('supreme-section')}>SUPRÊME</NavButton>
           <NavButton onClick={() => scrollToSection('pitacozza-section')}>PITACOZZA</NavButton>
           <NavButton onClick={() => scrollToSection('sandwich-section')}>SANDWICHS</NavButton>
           <NavButton onClick={() => scrollToSection('tacos-section')}>TACOS</NavButton>
           <NavButton onClick={() => scrollToSection('spaghetti-section')}>SPAGHETTI</NavButton>
           <NavButton onClick={() => scrollToSection('salade-section')}>SALADE</NavButton>
           <NavButton onClick={() => scrollToSection('combo-section')}>COMBO</NavButton>
           <NavButton onClick={() => scrollToSection('pasticcio-section')}>PASTICCIO</NavButton>
           <NavButton onClick={() => scrollToSection('burger-section')}>BURGERS</NavButton>
           <NavButton onClick={() => scrollToSection('panini-section')}>PANINIS</NavButton>
           <NavButton onClick={() => scrollToSection('texmex-section')}>TEX MEX</NavButton>
           <NavButton onClick={() => scrollToSection('boissons-section')}>BOISSONS</NavButton>
        </NavContainer>
      </Nav>

      <LogoContainer>
        <Logo src={logo} alt="Aji Naklou Logo" />
      </LogoContainer>

      <Container>
        {/* PLAT DU JOUR SECTION */}
        {showPlatDuJour && (
          <SpecialSection id="plat-du-jour-section">
            <SectionTitle>🌟 PLAT DU JOUR 🌟</SectionTitle>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <Card style={{ maxWidth: '600px', width: '100%', border: '2px solid #ff9f1c', boxShadow: '0 0 20px rgba(255,159,28,0.15)' }}>
                  <ItemImage src={menuPlaceholder} alt={platDuJourItem.name} style={{ height: '350px' }} />
                  <ItemHeader>
                    <ItemName style={{ fontSize: '1.8rem', color: '#ff9f1c' }}>{platDuJourItem.name}</ItemName>
                    <Price style={{ fontSize: '1.3rem', padding: '8px 16px' }}>{platDuJourItem.price}dh</Price>
                  </ItemHeader>
                  <Ingredients style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#fff' }}>{platDuJourItem.ingredients}</Ingredients>
                  <p style={{ color: '#ccc', textAlign: 'center', fontStyle: 'italic', fontSize: '1rem' }}>"{platDuJourItem.description}"</p>
               </Card>
            </div>
          </SpecialSection>
        )}

        {/* OFFER OF THE DAY SECTION */}
        {showOfferOfTheDay && (
          <SpecialSection id="offer-section" style={{ borderColor: '#e74c3c', background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.05) 0%, rgba(18, 18, 18, 0) 100%)' }}>
            <SectionTitle style={{ color: '#e74c3c' }}>🔥 OFFRE DU JOUR 🔥</SectionTitle>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <Card style={{ maxWidth: '600px', width: '100%', border: '2px solid #e74c3c', boxShadow: '0 0 20px rgba(231, 76, 60, 0.15)' }}>
                  <ItemImage src={menuPlaceholder} alt={offerItem.name} style={{ height: '350px' }} />
                  <ItemHeader>
                    <ItemName style={{ fontSize: '1.8rem', color: '#e74c3c' }}>{offerItem.name}</ItemName>
                    <Price style={{ backgroundColor: '#e74c3c', fontSize: '1.3rem', padding: '8px 16px', color: 'white' }}>{offerItem.price}dh</Price>
                  </ItemHeader>
                  <Ingredients style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#fff' }}>{offerItem.ingredients}</Ingredients>
                  <p style={{ color: '#ccc', textAlign: 'center', fontStyle: 'italic', fontSize: '1rem' }}>"{offerItem.description}"</p>
               </Card>
            </div>
          </SpecialSection>
        )}

        {/* PLATS SECTION */}
        <Section id="plats-section">
          <SectionTitle>LES PLATS</SectionTitle>
          <Grid>
            {platsItems.map((item, index) => (
              <Card key={index}>
                <ItemImage src={menuPlaceholder} alt={item.name} />
                <ItemHeader>
                  <ItemName>{item.name}</ItemName>
                  <Price>{item.price}dh</Price>
                </ItemHeader>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* SUPREME SECTION */}
        <Section id="supreme-section">
          <SectionTitle>SUPRÊME</SectionTitle>
          <Grid>
            {supremeItems.map((item, index) => (
              <Card key={index}>
                <ItemImage src={menuPlaceholder} alt={item.name} />
                <ItemHeader>
                  <ItemName>{item.name}</ItemName>
                  <Price>{item.price}dh</Price>
                </ItemHeader>
              </Card>
            ))}
          </Grid>
          <ExtrasSection>
             <SubTitle>Extras</SubTitle>
             <ExtrasGrid>
                <ExtraItem>🍟 Frites <Price>5 DH</Price></ExtraItem>
                <ExtraItem>🥔 Potatoes <Price>12 DH</Price></ExtraItem>
             </ExtrasGrid>
          </ExtrasSection>
        </Section>

        {/* PITACOZZA SECTION */}
        <Section id="pitacozza-section">
          <SectionTitle>PITACOZZA</SectionTitle>
          <Grid>
            {pitacozzaItems.map((item, index) => (
              <Card key={index}>
                <ItemImage src={menuPlaceholder} alt={item.name} />
                <ItemHeader>
                  <ItemName>{item.name}</ItemName>
                  <Price>{item.price}dh</Price>
                </ItemHeader>
                <Ingredients>{item.ingredients}</Ingredients>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* TACOS SECTION */}
        <Section id="tacos-section">
          <SectionTitle>FRENCH TACOS</SectionTitle>
          <TacosDescription>Frites, Sauce fromagère, 2 Sauces au Choix</TacosDescription>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
             <ItemImage src={menuPlaceholder} alt="Tacos" style={{ maxWidth: '400px', height: 'auto' }} />
          </div>

          <TacosTable>
            <StyledTable>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>M</th>
                  <th>L</th>
                  <th>XL</th>
                </tr>
              </thead>
              <tbody>
                {tacosItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="price-col">{item.m}dh</td>
                    <td className="price-col">{item.l}dh</td>
                    <td className="price-col">{item.xl}dh</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TacosTable>

          <Grid style={{ marginTop: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <ExtrasSection style={{ marginTop: 0 }}>
                <SubTitle>Suppléments (5 DH)</SubTitle>
                <Grid style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '15px' }}>
                  {supplementsItems.map((item, index) => (
                    <ExtraCard key={index}>
                       <ExtraImage src={extraPlaceholder} alt={item} />
                       <ExtraName>{item}</ExtraName>
                    </ExtraCard>
                  ))}
                </Grid>
              </ExtrasSection>

              <ExtrasSection style={{ marginTop: 0 }}>
                <SubTitle>Gratinage (10 DH)</SubTitle>
                <Grid style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '15px' }}>
                   {gratinageItems.map((item, index) => (
                    <ExtraCard key={index}>
                       <ExtraImage src={extraPlaceholder} alt={item} />
                       <ExtraName>{item}</ExtraName>
                    </ExtraCard>
                  ))}
                </Grid>
              </ExtrasSection>
          </Grid>

          <ExtrasSection>
             <SubTitle>Extras</SubTitle>
             <ExtrasGrid>
                <ExtraItem>🍟 Frites <Price>5 DH</Price></ExtraItem>
                <ExtraItem>🥔 Potatoes <Price>12 DH</Price></ExtraItem>
             </ExtrasGrid>
          </ExtrasSection>
        </Section>

        {/* PIZZA SECTION */}
        <Section id="pizza-section">
          <SectionTitle>PIZZA</SectionTitle>
          <Grid>
            {pizzaItems.map((item, index) => (
              <Card key={index}>
                <ItemImage src={menuPlaceholder} alt={item.name} />
                <ItemHeader>
                  <ItemName>{item.name}</ItemName>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                    <Price style={{ fontSize: '0.9rem' }}>1P: {item.p1}dh</Price>
                    <Price style={{ fontSize: '0.9rem' }}>2P: {item.p2}dh</Price>
                  </div>
                </ItemHeader>
                <Ingredients>{item.ingredients}</Ingredients>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* SANDWICHS SECTION */}
        <Section id="sandwich-section">
          <SectionTitle>SANDWICHS</SectionTitle>
          <Grid>
            {sandwichItems.map((item, index) => (
              <Card key={index}>
                <ItemImage src={menuPlaceholder} alt={item.name} />
                <ItemHeader>
                  <ItemName>{item.name}</ItemName>
                  <Price>{item.price}dh</Price>
                </ItemHeader>
                <div style={{ marginTop: '10px' }}>
                   <span style={{ color: '#aaa', fontSize: '0.9rem' }}>+ Frites 5 DH | + Potatoes 12 DH</span>
                </div>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* SPAGHETTI SECTION */}
        <Section id="spaghetti-section">
          <SectionTitle>SPAGHETTI</SectionTitle>
          <Grid>
            {spaghettiItems.map((item, index) => (
              <Card key={index}>
                <ItemImage src={menuPlaceholder} alt={item.name} />
                <ItemHeader>
                  <ItemName>{item.name}</ItemName>
                  <Price>{item.price}dh</Price>
                </ItemHeader>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* SALADE SECTION */}
        <Section id="salade-section">
          <SectionTitle>SALADE</SectionTitle>
          <Grid>
            {saladeItems.map((item, index) => (
              <Card key={index}>
                <ItemImage src={menuPlaceholder} alt={item.name} />
                <ItemHeader>
                  <ItemName>{item.name}</ItemName>
                  <Price>{item.price}dh</Price>
                </ItemHeader>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* COMBO SECTION */}
        <Section id="combo-section">
          <SectionTitle>COMBO</SectionTitle>
          <Grid>
            {comboItems.map((item, index) => (
              <Card key={index}>
                <ItemImage src={menuPlaceholder} alt={item.name} />
                <ItemHeader>
                  <ItemName>{item.name}</ItemName>
                  <Price>{item.price}dh</Price>
                </ItemHeader>
                <Ingredients>{item.description}</Ingredients>
                <div style={{ marginTop: '10px' }}>
                   <span style={{ color: '#aaa', fontSize: '0.9rem' }}>+ Frites 5 DH | + Potatoes 12 DH</span>
                </div>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* PASTICCIO SECTION */}
        <Section id="pasticcio-section">
          <SectionTitle>PASTICCIO</SectionTitle>
          <div style={{ textAlign: 'center', marginBottom: '20px', color: '#aaa', fontStyle: 'italic' }}>
            Base frites (Base Potatoes + 7 Dhs)
          </div>
          <Grid>
            {pasticcioItems.map((item, index) => (
              <Card key={index}>
                <ItemImage src={menuPlaceholder} alt={item.name} />
                <ItemHeader>
                  <ItemName>{item.name}</ItemName>
                  <Price>{item.price}dh</Price>
                </ItemHeader>
                <Ingredients>{item.ingredients}</Ingredients>
              </Card>
            ))}
          </Grid>
          
          <ExtrasSection>
             <SubTitle>Cheesy</SubTitle>
             <Grid>
               {cheesyItems.map((item, index) => (
                  <Card key={index}>
                    <ItemImage src={menuPlaceholder} alt={item.name} />
                    <ItemHeader>
                      <ItemName>{item.name}</ItemName>
                      <Price>{item.price}dh</Price>
                    </ItemHeader>
                    <Ingredients>{item.ingredients}</Ingredients>
                  </Card>
               ))}
             </Grid>
          </ExtrasSection>
        </Section>

        {/* BURGERS SECTION */}
        <Section id="burger-section">
          <SectionTitle>BURGERS</SectionTitle>
          <Grid>
            {burgerItems.map((item, index) => (
              <Card key={index}>
                <ItemImage src={menuPlaceholder} alt={item.name} />
                <ItemHeader>
                  <ItemName>{item.name}</ItemName>
                  <Price>{item.price}dh</Price>
                </ItemHeader>
                <Ingredients>{item.ingredients}</Ingredients>
              </Card>
            ))}
          </Grid>
          <ExtrasSection>
             <SubTitle>Suppléments (5 DH)</SubTitle>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                {burgerSupplements.map((item, index) => (
                   <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <ExtraImage src={extraPlaceholder} alt={item.name} style={{ width: '60px', height: '60px' }} />
                      <span style={{ color: '#ccc' }}>{item.name}</span>
                   </div>
                ))}
             </div>
          </ExtrasSection>
        </Section>
        
        {/* PANINIS SECTION */}
        <Section id="panini-section">
          <SectionTitle>PANINIS</SectionTitle>
           <div style={{ textAlign: 'center', marginBottom: '20px', color: '#aaa', fontStyle: 'italic' }}>
            Avec frites (Accompagnement Potatoes + 7Dhs)
           </div>
          <Grid>
            {paniniItems.map((item, index) => (
              <Card key={index}>
                <ItemImage src={menuPlaceholder} alt={item.name} />
                <ItemHeader>
                  <ItemName>{item.name}</ItemName>
                  <Price>{item.price}dh</Price>
                </ItemHeader>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* TEX MEX SECTION */}
        <Section id="texmex-section">
          <SectionTitle>TEX MEX</SectionTitle>
          <Grid>
            {texMexItems.map((item, index) => (
              <Card key={index}>
                <ItemImage src={menuPlaceholder} alt={item.name} />
                <ItemHeader>
                  <ItemName>{item.name}</ItemName>
                  <Price>{item.price}dh</Price>
                </ItemHeader>
              </Card>
            ))}
          </Grid>
           <ExtrasSection>
             <SubTitle>DESSERT</SubTitle>
             <Grid>
               {dessertItems.map((item, index) => (
                  <Card key={index}>
                    <ItemImage src={menuPlaceholder} alt={item.name} />
                    <ItemHeader>
                      <ItemName>{item.name}</ItemName>
                      <Price>{item.price}dh</Price>
                    </ItemHeader>
                  </Card>
               ))}
             </Grid>
          </ExtrasSection>
        </Section>

        {/* JUS & BOISSONS SECTION */}
        <Section id="boissons-section">
          <SectionTitle>JUS ET BOISSONS</SectionTitle>
          <Grid style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            {boissonsItems.map((item, index) => (
              <Card key={index} style={{ padding: '15px' }}>
                <ItemHeader style={{ marginBottom: 0 }}>
                  <ItemName style={{ fontSize: '1rem' }}>{item.name}</ItemName>
                  <Price style={{ fontSize: '0.9rem' }}>{item.price}dh</Price>
                </ItemHeader>
              </Card>
            ))}
          </Grid>
        </Section>

      </Container>
    </PageWrapper>
  );
};

export default MenuPage;
