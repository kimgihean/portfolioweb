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
              <img src="/assets/images/gihyun.png" alt="Profile Image" />
            </div>
            
            <div className="resume-block">
              <h3 className="resume-block-title">ABOUT ME</h3>
              <ul className="resume-list no-bullet">
                <li><span className="list-label">birth:</span> 1997.03.03</li>
                <li><span className="list-label">address:</span> 경기도 성남시 분당구</li>
                <li><span className="list-label">tel:</span> 010-8443-2738</li>
                <li><span className="list-label">email:</span> rlgus2738@naver.com</li>
              </ul>
            </div>
          </div>

          {/* Column 2: Education & Experience & License */}
          <div className="resume-column has-border">
            <div className="resume-block">
              <h3 className="resume-block-title">EDUCATION</h3>
              <ul className="resume-list">
                <li>
                  <span className="list-year">2016.02</span>
                  <span className="list-text">보문고등학교 인문계 졸업</span>
                </li>
                <li>
                  <span className="list-year">2023.02</span>
                  <span className="list-text">가쳔대학교 글로벌 경영학과 / AI·SW 학부 졸업</span>
                </li>
              </ul>
            </div>

            <div className="resume-block">
              <h3 className="resume-block-title">EXPERIENCE</h3>
              <ul className="resume-list">
                <li>
                  <span className="list-year">2020</span>
                  <span className="list-text">2001 아울렛 디키즈 점 의류 영업 및<br />라이브 커머스 쇼호스트</span>
                </li>
                <li>
                  <span className="list-year">2023</span>
                  <span className="list-text">가천대학교 창업 코코네 스쿨 개발팀 근무</span>
                </li>
                <li>
                  <span className="list-year">2023~25</span>
                  <span className="list-text">게임덱스 웹서비스팀 개발팀 사원</span>
                </li>
                <li>
                  <span className="list-year">2025</span>
                  <span className="list-text">게임덱스 AI TF 개발 리딩</span>
                </li>
                <li>
                  <span className="list-year">2025~현재</span>
                  <span className="list-text">게임덱스 웹서비스팀 BE 파트 파트장</span>
                </li>
              </ul>
            </div>

            <div className="resume-block">
              <h3 className="resume-block-title">AWARDS & ACTIVITIES</h3>
              <ul className="resume-list">
                <li>
                  <span className="list-year">2023</span>
                  <span className="list-text">카카오엔터프라이즈 SW 아카데미</span>
                </li>
                <li>
                  <span className="list-year">2023</span>
                  <span className="list-text">LLOYDK 모니터링 해커톤</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Skills & Award & Title */}
          <div className="resume-column has-border">
            <div className="resume-block">
              <h3 className="resume-block-title">SKILLS</h3>
              <ul className="resume-list no-bullet">
                <li><span className="list-label bold">Back-End:</span> Spring MVC, Spring Boot, Node.js, Vue.js</li>
                <li><span className="list-label bold">AI/Data:</span> LangChain, AI Orchestration, LLM API</li>
                <li><span className="list-label bold">Database:</span> MySQL, MSSQL, Redis</li>
                <li><span className="list-label bold">Infra:</span> AWS, Docker, Kubernetes, CI/CD</li>
              </ul>
            </div>

            <div className="resume-block">
              <h3 className="resume-block-title">PROJECTS</h3>
              <ul className="resume-list">
                <li><span className="list-label-project bold">[AI PoC]</span>AI 기반 PRD, 유저플로우, API 명세서 자동화</li>
                <li><span className="list-label-project bold">[AI PoC]</span>AI 기반 CI, 코드리뷰 자동화</li>
                <li><span className="list-label-project bold">[AI TF]</span>AI 기반 글로벌 CS 티켓 생성</li>
                <li><span className="list-label-project bold">[WAS]</span><a href="https://cookierunbraverse.com" target="_blank" rel="noopener noreferrer" className="resume-link">쿠키런 브레이버스 TCG</a></li>
                <li><span className="list-label-project bold">[WAS]</span><a href="https://freestylefootball2.com" target="_blank" rel="noopener noreferrer" className="resume-link">조이시티 프리스타일 풋볼 2 홈페이지</a></li>
                <li><span className="list-label-project bold">[WAS]</span><a href="https://webshop.joycity.com/" target="_blank" rel="noopener noreferrer" className="resume-link">조이시티 웹상점</a></li>
                <li><span className="list-label-project bold">[WAS]</span>조이시티 VIP 라운지 통계툴</li>
                <li><span className="list-label-project bold">[운영]</span>AWS Cloud 운영/관리 및<br />사내 온프레미스, 도메인 관리</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
