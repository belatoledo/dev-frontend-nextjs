import Link from 'next/link';

import {
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <address role="list" className="flex flex-col gap-2 not-italic">
            <h3 className="font-bold text-lg mb-2">Atendimento</h3>
            <div role="listitem" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-500" />
              <a
                href="mailto:contato@diamondstore.com"
                aria-label="Enviar e-mail para contato@diamondstore.com"
                className="hover:text-cyan-500"
              >
                contato@diamondstore.com
              </a>
            </div>
            <div role="listitem" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-cyan-500" />
              <a href="tel:+5531999999999" className="hover:text-cyan-500">
                (31) 99999-9999
              </a>
            </div>
          </address>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">Nossas Redes Sociais</h3>
            <div className="flex items-center gap-4">
              <Link href="#" target="_blank" className=" hover:text-cyan-500">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" target="_blank" className="hover:text-cyan-500">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" target="_blank" className="hover:text-cyan-500">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-4 text-center text-sm">
          <p className="flex items-center justify-center">
            Feito com <Heart className="mx-1 h-4 w-4 text-pink-500" /> por
            Izabela Toledo
          </p>
          <p>&copy; 2025 Diamond Store. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
