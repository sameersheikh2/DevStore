import React from "react";
import { ArrowRight } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "../ui/Button";

const HeroSection = ({ onNavigate }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white rounded-2xl p-8 md:p-16 text-center">
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Simple Store
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
          Discover amazing products at unbeatable prices. Quality guaranteed,
          fast shipping, and exceptional customer service await you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <PrimaryButton
            onClick={() => onNavigate("/products")}
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 text-lg"
          >
            <span>Shop Now</span>
            <ArrowRight className="h-5 w-5" />
          </PrimaryButton>
          <SecondaryButton
            onClick={() => onNavigate("/products")}
            className="inline-flex items-center space-x-2 border-2 border-white text-white bg-black px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 text-lg"
          >
            <span>View Categories</span>
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
