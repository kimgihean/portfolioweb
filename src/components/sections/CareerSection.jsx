import React from 'react';
import './CareerSection.css';

const CareerSection = () => {
  return (
    <section className="career-section" id="career">
      <div className="resume-container">
        
        {/* Header */}
        <div className="resume-header">
          <h2 className="resume-name">Gihyun Kim</h2>
          <span className="resume-role">BACKEND & AI ENGINEER</span>
        </div>

        {/* 3-Column Grid */}
        <div className="resume-grid allow-scroll">
          
          {/* Column 1: Profile & About */}
          <div className="resume-column">
            <div className="resume-profile-img">
              <div className="img-placeholder">
                <span>Profile Image</span>
              </div>
            </div>
            
            <div className="resume-block">
              <h3 className="resume-block-title">ABOUT ME</h3>
              <ul className="resume-list no-bullet">
                <li><span className="list-label">birth:</span> 1990.01.01</li>
                <li><span className="list-label">address:</span> 서울시 강남구 테헤란로</li>
                <li><span className="list-label">tel:</span> 010-1234-5678</li>
                <li><span className="list-label">email:</span> example@gmail.com</li>
                <li><span className="list-label">github:</span> github.com/username</li>
              </ul>
            </div>
          </div>

          {/* Column 2: Education & Experience & License */}
          <div className="resume-column has-border">
            <div className="resume-block">
              <h3 className="resume-block-title">EDUCATION</h3>
              <ul className="resume-list">
                <li>
                  <span className="list-year">2010.03</span>
                  <span className="list-text">한국대학교 컴퓨터공학과 학사 입학</span>
                </li>
                <li>
                  <span className="list-year">2016.02</span>
                  <span className="list-text">한국대학교 컴퓨터공학과 학사 졸업</span>
                </li>
              </ul>
            </div>

            <div className="resume-block">
              <h3 className="resume-block-title">EXPERIENCE</h3>
              <ul className="resume-list">
                <li>
                  <span className="list-year">2018~2020</span>
                  <span className="list-text">테크스타트업 백엔드 개발팀 근무</span>
                </li>
                <li>
                  <span className="list-year">2020~2023</span>
                  <span className="list-text">유니콘컴퍼니 분산시스템 아키텍트</span>
                </li>
                <li>
                  <span className="list-year">2023~현재</span>
                  <span className="list-text">AI Labs AI 서빙 파이프라인 개발 리드</span>
                </li>
              </ul>
            </div>

            <div className="resume-block">
              <h3 className="resume-block-title">LICENSE</h3>
              <ul className="resume-list">
                <li>정보처리기사 (2015.11 취득)</li>
                <li>AWS Certified Solutions Architect (2021.05 취득)</li>
              </ul>
            </div>
          </div>

          {/* Column 3: Skills & Award & Title */}
          <div className="resume-column has-border">
            <div className="resume-block">
              <h3 className="resume-block-title">SKILLS</h3>
              <ul className="resume-list no-bullet">
                <li><span className="list-label bold">Back-End:</span> Node.js, NestJS, Python</li>
                <li><span className="list-label bold">AI/Data:</span> RAG, LangChain, Vector DB</li>
                <li><span className="list-label bold">Database:</span> PostgreSQL, Redis, MongoDB</li>
                <li><span className="list-label bold">ETC:</span> AWS, Docker, Kubernetes, CI/CD</li>
              </ul>
            </div>

            <div className="resume-block">
              <h3 className="resume-block-title">AWARD</h3>
              <ul className="resume-list">
                <li>
                  <span className="list-year">2015</span>
                  <span className="list-text">교내 해커톤 대상 수상</span>
                </li>
                <li>
                  <span className="list-year">2022</span>
                  <span className="list-text">오픈소스 컨트리뷰톤 우수상</span>
                </li>
              </ul>
            </div>

            <div className="resume-block">
              <h3 className="resume-block-title">TITLE</h3>
              <ul className="resume-list">
                <li>
                  <span className="list-year">2023</span>
                  <span className="list-text">사내 기술 블로그 우수 기고자 선정</span>
                </li>
                <li>
                  <span className="list-year">2024</span>
                  <span className="list-text">AWS 세미나 게스트 스피커 참여</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CareerSection;
